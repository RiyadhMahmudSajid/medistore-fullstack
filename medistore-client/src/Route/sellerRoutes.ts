import { Route } from "@/types";

export const sellerRoutes: Route[] = [
    {
        title: "SellerDashBoard",
        items: [
            {
                title: "Create Medicine",
                url: "/sellerdashboard/CreateMedicine"
            },
            {
                title: "My Medicine",
                url: "/sellerdashboard/getSellerMedicine"
            },
            {
                title: "AllOrder",
                url: "/sellerdashboard/allOrder"
            },
            {
                title: "MyMedicineReview",
                url: "/sellerdashboard/myMedicineReview"
            },
            {
                title: "Home",
                url: "/"
            }

        ]
    }
]