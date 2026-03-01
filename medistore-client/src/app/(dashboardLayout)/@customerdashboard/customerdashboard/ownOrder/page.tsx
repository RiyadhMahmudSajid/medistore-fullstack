import GetMyOrder from "@/components/modules/dashboardComponent/customerDashboard/GetMyOrder";
import orderService from "@/components/modules/orderService";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

const ownOrder = async () => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const {data} = await orderService.getMyOrder(cookieHeader)
    
    return (
        <div>
           <GetMyOrder orders= {data}></GetMyOrder>
        </div>
    );
};

export default ownOrder;