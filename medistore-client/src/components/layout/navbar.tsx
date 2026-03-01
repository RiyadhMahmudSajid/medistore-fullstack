
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { ChevronDown,  User } from "lucide-react";
import { ModeToggle } from "./modeTogol";
import Link from "next/link";

import { Button } from "../ui/button";
import CartCounterWrapper from "./HomeOther/CartCounterWrapper";
import userService from "../modules/userService";
import LogoutButton from "./HomeOther/LogoutButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";



const Navbar = async () => {
  const { data } = await userService.getSession();
  const userInfo = {
    role: data?.user?.role
  };

  const dashboardLink = userInfo.role === 'ADMIN'
    ? '/admindashboard'
    : userInfo.role === 'SELLER'
      ? '/sellerdashboard'
      : '/customerdashboard';

  return (
    <nav className="fixed inset-x-0 top-0 z-40 border-b bg-background/80 backdrop-blur-md shadow-sm ">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        
        <Logo />

   

        <div className="flex items-center gap-2 sm:gap-4">
          <CartCounterWrapper />

          {data?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 h-10 sm:h-12 px-2 sm:px-4 rounded-xl bg-secondary/50 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all group outline-none"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border group-hover:border-primary/30 transition-colors">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                 
                  <div className="hidden sm:flex items-center gap-1 leading-none">
                    <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {data.user.name.split(" ")[0]}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 p-2 mt-2">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none">{data.user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{data.user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href={dashboardLink}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="w-full ml-[0.5rem]">
                  <LogoutButton />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" size="sm" className="h-9 sm:h-11 px-4 sm:px-6 rounded-lg text-sm font-medium">
              <Link href="/login">Sign In</Link>
            </Button>
          )}

          <ModeToggle />
          
         
        
        </div>
      </div>
       <div className="md:hidden  max-w-3/12 mx-auto">
          <NavMenu />
        </div>
    </nav>
  );
};


export default Navbar;