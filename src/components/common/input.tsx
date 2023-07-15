import { cn } from "@/lib/utils";

export const input = (props: React.HTMLProps<HTMLInputElement>) => (
  <input
    {...props}
    className={cn(
      "h-full w-full rounded-md object-cover px-4 py-3 text-lg text-slate-900 !outline-none",
      props.className
    )}
  />
);
