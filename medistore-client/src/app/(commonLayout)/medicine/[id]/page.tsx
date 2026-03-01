export const dynamic = "force-dynamic";
import medicineService from "@/components/modules/medicineService";
import { Button } from "@/components/ui/button";
import MedicineDetailsClient from "./MedicineDetailsClient";
import { Medicine } from "@/types";


export async function generateStaticParams() {
  const { data } = await medicineService.getAllMedicine()

  return data?.AllMedicine?.map((medicine: Medicine) => ({ id: medicine.id })).splice(0,6)

}

export default async function MedicineDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await medicineService.getMedicineById(id);
  const medicine: Medicine | undefined = data;

  if (!medicine) return <p>Medicine not found!</p>;

  return <MedicineDetailsClient medicine={medicine}></MedicineDetailsClient>
}