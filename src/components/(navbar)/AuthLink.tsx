import Link from "next/link";
import { cn } from "@/lib/utils";

const AuthLink = ({ text = "", href = "" }) => {
  return (
    <Link href={href}>
      <div className="group relative h-full">
        <div className="flex h-full items-center border-l-2 border-slate-900 px-4 hover:bg-blue-700">
          <span>{text}</span>
        </div>
        <div
          className={cn(
            "absolute flex h-full w-full -translate-y-full items-center justify-center",
            "border-l-2 border-slate-900 bg-blue-300",
            "duration-300 ease-in-out",
            "group-hover:-translate-x-[3px] group-hover:-translate-y-[calc(100%+3px)] group-hover:border-2",
            "group-hover:bg-blue-700 group-hover:font-bold group-hover:text-white group-hover:shadow-sm "
          )}
        >
          <span>{text}</span>
        </div>
      </div>
    </Link>
  );
};

export default AuthLink;
