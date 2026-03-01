import * as React from "react"
import Link from "next/link"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { LayoutDashboard } from "lucide-react"
import { adminRoutes } from "@/Route/adminRoutes"
import { customerRoutes } from "@/Route/customerRoutes"
import { sellerRoutes } from "@/Route/sellerRoutes"

export function DashboardSidebar({ user, ...props }: { user: { role: string } } & React.ComponentProps<typeof Sidebar>) {
    

    let routes: any = []
    if (user.role === "ADMIN") routes = adminRoutes
    else if (user.role === "CUSTOMER") routes = customerRoutes
    else if (user.role === "SELLER") routes = sellerRoutes
    else return null

    return (
        <Sidebar className="border-r border-sidebar-border bg-sidebar" {...props}>
           
            <SidebarHeader className="h-16 flex items-center px-6 border-b border-sidebar-border/50">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
                        <LayoutDashboard className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-lg text-sidebar-foreground">
                        Medi<span className="text-primary">Hub</span>
                    </span>
                </div>
            </SidebarHeader>

            <SidebarContent className="p-3">
                {routes.map((group: any) => (
                    <SidebarGroup key={group.title} className="py-2">
                      
                        <SidebarGroupLabel className="px-3 text-[10px] uppercase font-bold text-muted-foreground mb-1">
                            {group.title}
                        </SidebarGroupLabel>
                        
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-0.5">
                                {group.items.map((item: any) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton 
                                            asChild 
                                            className="h-9 px-3 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-primary transition-colors font-medium"
                                        >
                                            <Link href={item.url}>
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary/40 mr-1" />
                                                {item.title}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    )
}
