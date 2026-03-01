import { OrderStatus, Prisma } from "@prisma/client"
import { prisma } from "../../lib/prisma"
import SSLCommerzPayment from "sslcommerz-lts";
const store_id = process.env.STORE_ID as string;
const store_passwd = process.env.STORE_PASS as string;
const is_live = false;
type OrderItemInput = {
    medicineId: string
    quantity: number
    price: number
}

type CreateOrderPayload = {
    status?: OrderStatus
    totalPrice: number
    addressId: string
    items: OrderItemInput[]
}


const createOrder = async (payload: CreateOrderPayload, customerId: string) => {


    const orderResult = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {

        const medicineIds = payload.items.map(item => item.medicineId);

        const medicinesInDb = await tx.medicines.findMany({
            where: { id: { in: medicineIds } }
        });

        let calculatedTotalPrice = 0;

        const orderItemsData = payload.items.map(item => {
           const medicine = medicinesInDb.find((m: any) => m.id === item.medicineId);

            if (!medicine) {
                throw new Error(`Medicine ID ${item.medicineId} not found`);
            }

            const itemTotal = medicine.price * item.quantity;
            calculatedTotalPrice += itemTotal;

            return {
                medicineId: item.medicineId,
                quantity: item.quantity,
                price: medicine.price
            };
        });

        const result = await tx.orders.create({
            data: {
                status: payload.status ?? "PLACED",

                totalPrice: calculatedTotalPrice,
                address: { connect: { id: payload.addressId } },
                customer: { connect: { id: customerId } },
                order: {
                    create: orderItemsData.map(item => ({
                        medicine: { connect: { id: item.medicineId } },
                        quantity: item.quantity,
                        price: item.price
                    }))
                },
            },
            include: {
                order: true,
                address: true,
                customer: true
            }
        });

        return result;
    });



    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    const paymentData = {
        total_amount: orderResult.totalPrice,
        currency: "BDT",
        tran_id: orderResult.id,
        success_url: `${process.env.BETTER_AUTH_URL}/order/success/${orderResult.id}`,
        fail_url: `${process.env.BETTER_AUTH_URL}/order/fail/${orderResult.id}`,
        cancel_url: `${process.env.BETTER_AUTH_URL}/order/cancel/${orderResult.id}`,
        ipn_url: "",

        shipping_method: 'Courier',
        product_name: 'Medicine Bundle',
        product_category: 'Healthcare',
        product_profile: 'general',
        cus_name: 'Customer',
        cus_email: 'customer@test.com',
        cus_add1: 'Dhaka',
        cus_phone: '01700000000',
        ship_name: 'Customer',
        ship_add1: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    const apiResponse = await sslcz.init(paymentData);

    return {
        order: orderResult,
        paymentUrl: apiResponse.GatewayPageURL
    };
};

const updateOrderStatus = async (orderId: string, statusUpdate: OrderStatus) => {


    let fromStatus: OrderStatus;

    if (statusUpdate === 'PROCESSING' || statusUpdate === 'CANCELLED') {
        fromStatus = 'PLACED';
    } else if (statusUpdate === 'SHIPPING') {
        fromStatus = 'PROCESSING';
    }
    else if (statusUpdate === 'DELIVERED') {
        fromStatus = 'SHIPPING';
    }
    else {
        throw new Error('Invalid target status');
    }

    const result = await prisma.orders.updateMany({
        where: {
            id: orderId,
            status: fromStatus,
            
        },
        data: {
            status: statusUpdate,
        },
    });


    return result;
};

const handleSuccess = async (orderId: string) => {

    if (!orderId) {
        throw new Error("Order ID is missing");
    }

    await prisma.orders.update({
        where: { id: orderId },
        data: {
            status: OrderStatus.PROCESSING,
        },
    });

    return {
        message: "Payment successful! Order is now processing.",
    };
};

const handleFail = async (orderId?: string) => {

    if (orderId) {
        await prisma.orders.update({
            where: { id: orderId },
            data: {
                status: OrderStatus.CANCELLED,
            },
        });
    }

    return {
        message: "Payment failed!",
    };
};

const handleCancel = async (orderId?: string) => {

    if (orderId) {
        await prisma.orders.update({
            where: { id: orderId },
            data: {
                status: OrderStatus.CANCELLED,
            },
        });
    }

    return {
        message: "Payment cancelled by user!",
    };
};

const getMyOrder = async (customerId: string) => {

    const customerMedicine = await prisma.orders.findMany({
        where: {
            customerId: customerId,
        },
        include: {
            address: true,
            order: {
                include: {
                    medicine: true,
                },
            },
        },
    });

    return customerMedicine;
};

const getMyMedicineOrder = async (sellerId: string) => {
    const sellerOrders = await prisma.orders.findMany({
        where: {
            order: {
                some: {
                    medicine: {
                        sellerId: sellerId
                    }
                }
            }
        },

        orderBy: {
            createdAt: "desc",
        },

        include: {
            address: true,
            customer: true,
            order: {
                include: {
                    medicine: true
                }
            }
        }
    })
    return sellerOrders
}



export const orderService = {
    createOrder, updateOrderStatus, handleSuccess,
    handleFail,
    handleCancel,
    getMyOrder, getMyMedicineOrder
}


