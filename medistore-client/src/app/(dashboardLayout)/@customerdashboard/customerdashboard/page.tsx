export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";


const CustomerPage = () => {
    return redirect('/customerdashboard/ownOrder')
};

export default CustomerPage;