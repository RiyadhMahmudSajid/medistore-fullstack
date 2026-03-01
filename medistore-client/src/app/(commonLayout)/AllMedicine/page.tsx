export const dynamic = "force-dynamic";
import Image from "next/image";
import medicineService from "@/components/modules/medicineService";
import { Medicine } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { NavMenu } from "@/components/nav-menu";
import PaginationControls from "@/components/ui/PaginationControls";

const Allmedicine = async ({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) => {

    const {page} = await searchParams;
    

    const { data } = await medicineService.getAllMedicine(
        { search: "",page },
        { revalidate: 10 }
    );
    
    const pagination  = data.pagination
  


    return (
        <div className="max-w-7xl mx-auto">
            <div className="pt-8 px-8">
                <NavMenu ></NavMenu>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-8">
                {data?.AllMedicine?.map((medicine: Medicine) => (
                    <Card
                        key={medicine.id}
                        className="group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                    >

                        <div className="relative h-52 w-full overflow-hidden">
                            <Image
                                src={medicine.image || "/placeholder.png"}
                                alt={medicine.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        <CardHeader className="space-y-2">
                            <Badge className="w-fit">{medicine.manufacturer}</Badge>

                            <CardTitle className="text-lg font-semibold">
                                {medicine.name}
                            </CardTitle>

                            <CardDescription className="line-clamp-2 text-sm">
                                {medicine.description}
                            </CardDescription>

                            <div className="text-xl font-bold text-green-600">
                                ৳ {medicine.price}
                            </div>
                        </CardHeader>

                        <CardFooter>
                            <Link href={`/medicine/${medicine.id}`} className="w-full">
                                <Button className="w-full rounded-xl">
                                    View Details
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}

            </div>

            <PaginationControls meta={pagination}></PaginationControls>

        </div>
    );
};

export default Allmedicine;