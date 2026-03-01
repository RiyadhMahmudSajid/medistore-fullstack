import { Medicine } from "@/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
const CategoryMedicine = ({ medicine }: { medicine: Medicine }) => {
    return (
        <Card className="mx-auto mt-4 w-full max-w-sm overflow-hidden">
            {/* Image section */}
            <div className="relative h-52 w-full overflow-hidden">
                <Image
                    src={medicine.image || "/placeholder.png"}
                    alt={medicine.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <CardHeader>
                <CardAction>
                    <Badge variant="secondary">Medicine</Badge>
                </CardAction>

                <CardTitle className="text-lg">
                    {medicine.name}
                </CardTitle>

                <CardDescription className="line-clamp-2">
                    {medicine.description}
                </CardDescription>

                <p className="text-sm text-muted-foreground">
                    Manufacturer: <span className="font-medium">{medicine.manufacturer}</span>
                </p>

                <p className="text-lg font-semibold text-primary">
                    ৳ {medicine.price}
                </p>
            </CardHeader>

            <CardFooter>
                <Link href={`/medicine/${medicine.id}`} className="w-full">
                    <Button className="w-full rounded-xl">
                        View Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default CategoryMedicine;