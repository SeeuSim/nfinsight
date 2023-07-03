import { Space_Mono } from "next/font/google";

import { cn } from "@/lib/utils";
import AuthLink from "./(navbar)/AuthLink";
import ShadowLink from "./(navbar)/ShadowLink";
import Logo from "./(navbar)/Logo";
import MobileMenu from "./(navbar)/MobileMenu";

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
        <ShadowLink text="Analytics" href="/analytics" />
        <ShadowLink text="Account" href="/account" />
      </div>
      <div className="hidden h-full md:inline-flex">
        <AuthLink text="Login" href="/login" />
        <AuthLink text="Sign Up" href="/signup" />
      </div>
      <div className="block md:hidden">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
