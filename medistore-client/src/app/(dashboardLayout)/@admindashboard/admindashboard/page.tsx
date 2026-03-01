export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";


const AdminPage = () => {
    return redirect("/admindashboard/createCategory");
};

export default AdminPage;