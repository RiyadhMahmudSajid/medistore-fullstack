"use client"

import * as React from "react"
import Link from "next/link"
import { Category } from "@/types"
import { useQuery } from "@tanstack/react-query"
import categoryService from "./modules/categoryService"
import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { LayoutGrid, ChevronRight } from "lucide-react"

interface AppSidebarProps {
  categories: Category[]
}

export function AppSidebar({ categories }: AppSidebarProps) {
  const [search, setSearch] = React.useState("")

  const { data = [] } = useQuery({
    queryKey: ["categories", search],
    queryFn: () => categoryService.getCategory({ search }),
    initialData: categories,
  })

  return (
    <Sidebar side="left"
      variant="sidebar" 
      
      className="top-16  border-r border-border/50 bg-background z-30">
      <SidebarHeader className="p-4">
        <div className="mb-4 px-2">
          <h2 className="text-lg font-bold tracking-tight text-primary">Medicine Categories</h2>
          <p className="text-xs text-muted-foreground">Find by health condition</p>
        </div>
        <SearchForm value={search} onChange={setSearch} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-widest font-bold">
            All Categories
          </SidebarGroupLabel>
          <SidebarMenu className="px-2 pt-2">
            {data?.map((category: Category) => (
              <SidebarMenuItem key={category.id} className="mb-1">
                <SidebarMenuButton
                  asChild
                  className="group relative flex items-center justify-between rounded-xl py-6 transition-all hover:bg-primary/10 hover:text-primary active:scale-95"
                >
                  <Link href={`/categoryPost/${category.id}`} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <LayoutGrid className="h-4 w-4" />
                    </div>
                    <span className="font-medium tracking-tight text-sm">
                      {category.name}
                    </span>
                    <ChevronRight className="ml-auto h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>


      <div className="mt-auto p-4 border-t border-border/50">
        <div className="rounded-xl bg-primary/5 p-3">
          <p className="text-[10px] font-medium text-primary uppercase">Support</p>
          <p className="text-xs text-muted-foreground">Need help finding medicine?</p>
        </div>
      </div>
    </Sidebar>
  )
}