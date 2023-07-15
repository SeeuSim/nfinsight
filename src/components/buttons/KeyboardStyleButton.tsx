import { cn } from "@/lib/utils";

const KeyboardStyleButton = (props: React.HTMLProps<HTMLButtonElement>) => (
  <button
    {...props}
    className={cn(
      "cursor-pointer select-none px-4 py-2 font-bold",
      "rounded-lg border-2 border-b-4 border-r-4 hover:border-2 ",
      "border-slate-500 bg-slate-100/70 text-slate-600 hover:text-slate-600",
      props.className
    )}
    type="button"
  >
    {props.children}
  </button>
);

export default KeyboardStyleButton;
