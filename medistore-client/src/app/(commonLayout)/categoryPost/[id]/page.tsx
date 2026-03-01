
import CategoryMedicine from "@/components/layout/categorywithmedicine/CategoryMedicine";
import categoryService from "@/components/modules/categoryService";

import { Medicine } from "@/types";




export default async function MedicineDetailsPage({ params, }: { params: Promise<{ id: string }>; }) {
    const { id } = await params;

    const { data: category } = await categoryService.getCategoryById(id);


    if (!category) return <p>Category not found!</p>;


    return (
        <div className="max-w-7xl mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {category.medicines?.length > 0 ? (
                    category.medicines.map((medicine: Medicine) => (
                        <CategoryMedicine
                            key={medicine.id}
                            medicine={medicine}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 border rounded-lg bg-white/50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
                        <h3 className="text-gray-400 dark:text-gray-500 font-medium tracking-wide uppercase text-xs mb-1">
                            Inventory Status
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 font-semibold text-lg">
                            No medicines found
                        </p>
                        <div className="mt-4 h-[1px] w-12 bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                )}

            </div>
        </div>
    );
}