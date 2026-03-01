export const dynamic = "force-dynamic";
import { redirect } from "next/navigation"
import { CreateMedicineForm } from "@/components/modules/dashboardComponent/sellerDashboard/CreateMedicine"
import userService from "@/components/modules/userService"
import categoryService from "@/components/modules/categoryService"



const CreateMedicine = async () => {

  const { data } = await userService.getSession()
  const categories  = await categoryService.getCategory({
    search:""
  },{revalidate:10})

  if (!data?.user) {
    redirect("/login")
  }



  return (
    <div>
      <CreateMedicineForm sellerId={data.user.id} categories={categories} />
    </div>
  )
}

export default CreateMedicine
