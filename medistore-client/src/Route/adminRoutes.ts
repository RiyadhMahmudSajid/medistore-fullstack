export const dynamic = "force-dynamic";
import { Route } from "@/types";

export const adminRoutes: Route[] = [
    {
        title: "AdminDashBoard",
        items: [
            {
                title: "Create Category",
                url: "/admindashboard/createCategory"
            },
            {
                title:"All Medicine Review",
                url:"/admindashboard/getAllreview"
            },
            {
                title:"Home",
                url:"/"
            }

        ]
    }
]