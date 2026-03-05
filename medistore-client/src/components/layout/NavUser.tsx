"use client";

import { useEffect, useState } from "react";
import { User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoutButton from "./HomeOther/LogoutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavUser() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        
        const res = await fetch("/api/auth/session");
        const result = await res.json();
        setSession(result.data);
      } catch (error) {
        setSession(null);
      } finally {
        setLoading(false);
      }
    }
    fetchSession();
  }, []);

  if (loading) return <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />;

  if (!session?.user) {
    return (
      <Button asChild variant="default" size="sm" className="h-9 sm:h-11 px-4 sm:px-6 rounded-lg text-sm font-medium">
        <Link href="/login">Sign In</Link>
      </Button>
    );
  }

  const dashboardLink = session.user.role === 'ADMIN' ? '/admindashboard' 
    : session.user.role === 'SELLER' ? '/sellerdashboard' : '/customerdashboard';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 h-10 px-2 rounded-xl bg-secondary/50 outline-none">
           <User className="h-5 w-5 text-primary" />
           <span className="text-sm font-bold">{session.user.name.split(" ")[0]}</span>
           <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2 mt-2">
        <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link href={dashboardLink}>Dashboard</Link></DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="w-full ml-[0.5rem]"><LogoutButton /></div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}