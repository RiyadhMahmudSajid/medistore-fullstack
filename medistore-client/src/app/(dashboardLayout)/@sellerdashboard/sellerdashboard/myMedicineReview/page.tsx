export const dynamic = "force-dynamic";
import { getSellerReview } from "@/action/reviewAction";
import MyMedReview from "@/components/modules/dashboardComponent/sellerDashboard/MyMedReview";

const MyMedicineReview = async() => {
    const {data} = await getSellerReview()
    
    return (
        <div>
           <MyMedReview medicineReview={data}></MyMedReview>
        </div>
    );
};

export default MyMedicineReview;


