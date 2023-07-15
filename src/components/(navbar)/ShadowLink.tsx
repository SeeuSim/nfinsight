import Link from "next/link";

import { cn } from "@/lib/utils";

const ShadowLink = ({ label = "", href = "#" }) => {
  return (
    <Link href={href}>
      <div className="group relative h-full w-full cursor-pointer text-xl">
        {/* Background shadow */}
        <span
          className={cn(
            "flex text-slate-800",
            "group-hover:text-blue-400 group-hover:underline"
          )}
        >
          {label}
        </span>

        {/* Main Span*/}
        <span
          className={cn(
            "absolute -translate-y-[calc(50%+14px)] text-slate-900",
            "group-hover:-translate-x-[1px] group-hover:-translate-y-[calc(50%+15px)]"
          )}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default ShadowLink;
