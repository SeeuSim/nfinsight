import Image from "next/image";
import Link from "next/link";
import { Space_Mono } from "next/font/google";

import { cn } from "@/lib/utils";
import AuthLink from "./(navbar)/AuthLink";
import ShadowLink from "./(navbar)/ShadowLink";

const font = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Navbar = () => {
  return (
    <div
      className={cn(
        `fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between border-b-2 shadow-sm backdrop-blur-sm`,
        `border-slate-900 dark:border-slate-700`,
        `bg-yellow-300 dark:bg-slate-900/75`,
        font.className
      )}
    >
      <Link href="/">
        <div className="mt-2 inline-flex items-center px-2">
          <Image
            src="/images/nfinsight_logo.png"
            width={64}
            height={64}
            alt="NFInsight"
          />
          <span className="text-3xl font-bold italic">NFInsight</span>
        </div>
      </Link>
      <div className="inline-flex space-x-6">
        <ShadowLink text="Analytics" href="/analytics" />
        <ShadowLink text="Account" href="/account" />
      </div>
      <div className="inline-flex h-full">
        <AuthLink text="Login" href="/login" />
        <AuthLink text="Sign Up" href="/signup" />
      </div>
    </div>
  );
};

export default Navbar;
