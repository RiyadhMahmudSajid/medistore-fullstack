export const dynamic = "force-dynamic"
import CheckoutPage from "@/components/layout/HomeOther/CheckoutPage";
import userService from "@/components/modules/userService";
import { redirect } from "next/navigation";

export default async function Page() {
  const {data} = await userService.getSession()
  


  if (!data.session) {
    redirect("/login");
  }

  if (data.user.role !== "CUSTOMER") {
    redirect("/");
  }

  return (
    <CheckoutPage user={data.user.id} ></CheckoutPage>
  );
}
