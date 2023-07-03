"use client";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import MobileNavLink from "./MobileNavLink";
import { NavbarFont } from "../Navbar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="group relative pr-3">
        <div className="rounded-md border-slate-900 p-2 duration-300 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px] group-hover:border-2 group-hover:border-b-4 group-hover:border-r-4 group-hover:bg-blue-700">
          <Menu className="h-6 w-6 text-slate-900 group-hover:text-slate-100" />
        </div>
      </SheetTrigger>
      <SheetContent
        className={cn(
          "w-[400px] border-l-2 border-slate-900 bg-blue-400 sm:w-[540px]",
          NavbarFont.className,
          "flex flex-col"
        )}
      >
        <MobileNavLink text="Home" href="/" />
        <MobileNavLink text="Analytics" href="/analytics" />
        <MobileNavLink text="Account" href="/account" />
        <hr className="border-[1px] border-slate-900" />
        <MobileNavLink text="Log In" href="/login" />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
