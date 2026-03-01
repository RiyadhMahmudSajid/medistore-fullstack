"use client"

import { useEffect, useState } from "react"
import type { ComponentProps } from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Search } from "lucide-react"
import medicineService from "@/components/modules/medicineService"
import { Medicine } from "@/types"



export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const [search, setSearch] = useState("")
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchMedicine = async () => {
      if (!search) {
        setMedicines([])
        return
      }

      setLoading(true)
      const res = await medicineService.getAllMedicine({ search })
      setMedicines(res.data?.AllMedicine ?? [])
      setLoading(false)
    }

    const delay = setTimeout(fetchMedicine, 400)
    return () => clearTimeout(delay)
  }, [search])





  return (
    <NavigationMenu
  {...props}
  className="w-full flex justify-center"
>
  <NavigationMenuList className="w-full flex justify-center">
    <NavigationMenuItem className="relative w-[250px] lg:w-[500px]">
      
      <div className="relative w-full flex items-center">
        
        <button className="absolute left-0 bg-primary h-11 w-12 flex items-center justify-center rounded-l-md">
          <Search className="h-5 w-5 text-primary-foreground" />
        </button>

        <input
          type="text"
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-16 pr-4 rounded-md bg-secondary focus-visible:ring-2 focus-visible:ring-primary text-sm"
        />
      </div>

      {search && (
        <div className="absolute top-12 z-50 w-full rounded-md border bg-background shadow-md">
          {loading && (
            <p className="p-3 text-sm text-muted-foreground">
              Searching...
            </p>
          )}

          {!loading && medicines.length === 0 && (
            <p className="p-3 text-sm text-muted-foreground">
              No medicine found
            </p>
          )}

          {medicines.map((medicine) => (
            <Link
              key={medicine.id}
              href={`/medicine/${medicine.id}`}
              className="block px-4 py-2 text-sm hover:bg-secondary transition "
            >
              {medicine.name} — ৳{medicine.price}
            </Link>
          ))}
        </div>
      )}
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
  )
}
