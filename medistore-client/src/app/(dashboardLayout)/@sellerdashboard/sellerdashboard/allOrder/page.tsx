export const dynamic = "force-dynamic";
import { getSellerOrder } from "@/action/medicineBySeller";
import SeeAllOrder from "@/components/modules/dashboardComponent/sellerDashboard/SeeAllOrder";

const AllOrder = async() => {
    const order = await getSellerOrder();
    
   
    const ordersData = order?.data || [];

    return (
        <div>
            <SeeAllOrder orders={ordersData}></SeeAllOrder>
        </div>
    );
};

export default AllOrder
