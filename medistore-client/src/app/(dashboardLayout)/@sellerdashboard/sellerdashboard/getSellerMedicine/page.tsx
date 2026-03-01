export const dynamic = "force-dynamic";
import { GetMyMedicine } from '@/components/modules/dashboardComponent/sellerDashboard/GetAllMedBySell';
import medicineService from '@/components/modules/medicineService';

import { cookies } from 'next/headers';


const GetSellerPage = async () => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const {data} = await medicineService.getMedicineBySellerId(cookieHeader);
  
    return (
        <div>
           <GetMyMedicine medicines={data || []} />
        </div>
    );
};

export default GetSellerPage;