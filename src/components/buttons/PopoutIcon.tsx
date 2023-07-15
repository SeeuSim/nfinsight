import { cn } from "@/lib/utils";

const PopoutIcon = ({
  children,
  hoverBg,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
  hoverBg?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-md border-slate-900 p-2 duration-300 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px] group-hover:border-2 group-hover:border-b-4 group-hover:border-r-4",
        `group-hover:${hoverBg}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default PopoutIcon
