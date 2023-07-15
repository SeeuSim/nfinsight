"use client";
import { Menu } from "lucide-react";

import PopoutIcon from "@/components/buttons/PopoutIcon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import MobileNavLink from "./MobileNavLink";
import { NavbarFont } from "./Navbar";
import { navConstants } from "./constants";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="group block pr-3 md:hidden">
        <PopoutIcon hoverBg="bg-blue-700">
          <Menu className="h-6 w-6 text-slate-900 group-hover:text-slate-100" />
        </PopoutIcon>
      </SheetTrigger>
      <SheetContent
        className={cn(
          "w-[400px] border-l-2 border-slate-900 bg-blue-400 sm:w-[540px]",
          NavbarFont.className,
          "flex flex-col"
        )}
      >
        {[{ label: "Home", href: "/" }, ...navConstants.common].map(
          (commonLink, index) => (
            <MobileNavLink key={index} {...commonLink} />
          )
        )}
        <hr className="border-[1px] border-slate-900" />
        {navConstants.unauthenticated.map((unAuthedLink, index) => (
          <MobileNavLink key={index} {...unAuthedLink} />
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
