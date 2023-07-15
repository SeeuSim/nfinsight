import { Space_Mono } from "next/font/google";

import { cn } from "@/lib/utils";
import AuthLink from "./AuthLink";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import ShadowLink from "./ShadowLink";
import { navConstants } from "./constants";

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
        {navConstants.common.map((navLink, index) => (
          <ShadowLink key={index} {...navLink} />
        ))}
      </div>
      <div className="hidden h-full md:inline-flex">
        {navConstants.unauthenticated.map((unAuthedLink, index) => (
          <div key={index} className={cn(unAuthedLink.background ?? "")}>
            <AuthLink {...unAuthedLink} />
          </div>
        ))}
      </div>
      <div className="block md:hidden">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
