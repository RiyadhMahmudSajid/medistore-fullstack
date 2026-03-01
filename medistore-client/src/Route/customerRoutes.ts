export const dynamic = "force-dynamic";
import { Route } from "@/types";

export const customerRoutes: Route[] = [
    {
        title: "CustomerDashBoard",
        items: [
            {
                title: "My Order",
                url: "/customerdashboard/ownOrder"
            },
            {
                title:"CreateReview",
                url:"/customerdashboard/myreview"
            },
             {
                title:"Home",
                url:"/"
            }

        ]
    }
]