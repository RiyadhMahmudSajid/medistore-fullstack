import { AppSidebar } from "@/components/app-sidebar"
import userService from "@/components/modules/userService"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DashboardSidebar } from "@/components/ui/dashboard-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

export default async function Page({ admindashboard, customerdashboard, sellerdashboard }: { admindashboard: React.ReactNode; customerdashboard: React.ReactNode; sellerdashboard: React.ReactNode }) {

    
  const {data} = await userService.getSession()
  console.log(data);
    const userInfo = {
        role: data.user.role
    }
    return (
        <SidebarProvider>
            <DashboardSidebar user={userInfo}></DashboardSidebar>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                               
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                               
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div>
                    {
                        userInfo.role === "ADMIN"
                            ? admindashboard
                            : userInfo.role === "SELLER"
                                ? sellerdashboard
                                : customerdashboard
                    }

                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
