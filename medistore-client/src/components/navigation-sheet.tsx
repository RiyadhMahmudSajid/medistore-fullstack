import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="text-left mb-8">
          <Logo />
        </SheetHeader>
        <div className="flex flex-col gap-6">
          {/* Mobile Search - modifying NavMenu style slightly for vertical stack if needed */}
         
          
          <nav className="flex flex-col gap-4 font-medium">
            <a href="#" className="hover:text-primary transition-colors">Medicine Store</a>
            <a href="#" className="hover:text-primary transition-colors">Healthcare Services</a>
            <a href="#" className="hover:text-primary transition-colors">Offers</a>
            <hr className="border-border" />
            <Button variant="outline" className="w-full">Sign In</Button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};