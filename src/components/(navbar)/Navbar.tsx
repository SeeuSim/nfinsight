import { Space_Mono } from "next/font/google";

import { cn } from "@/lib/utils";
import AuthLink from "./AuthLink";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import ShadowLink from "./ShadowLink";
import { navConstants } from "./constants";
import Searchbar from "./search/Searchbar";

export const NavbarFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Navbar = () => {
  return (
    <div
      className={cn(
        `fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between border-b-2 shadow-sm backdrop-blur-sm`,
        `border-slate-900 dark:border-slate-700`,
        `bg-blue-300 dark:bg-slate-900/75`,
        NavbarFont.className
      )}
    >
      <Logo copyText="NFInsight" />
      <div className="hidden space-x-6 md:inline-flex">
        {navConstants.common.map((commonLink, index) => (
          <ShadowLink key={index} {...commonLink} />
        ))}
      </div>
      <div className="inline-flex h-full items-center">
        <Searchbar className="mr-2" />
        <div className="hidden h-full items-center md:inline-flex">
          {navConstants.unauthenticated.map((unAuthedLink, index) => (
            <div
              key={index}
              className={cn(unAuthedLink.background ?? "", "h-full")}
            >
              <AuthLink {...unAuthedLink} />
            </div>
          ))}
        </div>
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
