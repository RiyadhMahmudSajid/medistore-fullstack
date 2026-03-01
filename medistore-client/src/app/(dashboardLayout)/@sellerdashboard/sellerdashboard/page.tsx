export const dynamic = "force-dynamic";
import { redirect } from 'next/navigation';


const SellerPage = () => {
    return redirect('/sellerdashboard/CreateMedicine')
};

export default SellerPage;