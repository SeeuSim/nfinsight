import Link from "next/link";
import { cn } from "@/lib/utils";

const AuthLink = ({ text = "", href = "" }) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          `flex h-full items-center border-l-2 border-slate-900 px-4 hover:cursor-pointer hover:font-bold hover:text-slate-50`,
          `hover:bg-yellow-700`
        )}
      >
        <span>{text}</span>
      </div>
    </Link>
  );
};

export default AuthLink;
