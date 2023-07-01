import Link from "next/link";

import { cn } from "@/lib/utils";

const ShadowLink = ({ text = "", href = "#" }) => {
  return (
    <Link href={href}>
      <div className="group relative h-full w-full cursor-pointer text-xl">
        {/* Background shadow */}
        <span
          className={cn(
            `flex text-slate-800 group-hover:underline`,
            `group-hover:text-yellow-600 `
          )}
        >
          {text}
        </span>

        {/* Main Span*/}
        <span
          className={`absolute -translate-y-[calc(50%+14px)] text-slate-900 group-hover:-translate-x-[1px] group-hover:-translate-y-[calc(50%+15px)]`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};

export default ShadowLink;
