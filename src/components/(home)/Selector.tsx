"use client"

import { useAnimate } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Option = {
  label: string;
  value: string;
  index?: string;
};

interface SelectorProps<T> {
  value: string;
  onValueChange: (value: string) => void;
  fontClassName?: string;
  hideOption?: (value: Option) => boolean;
  options: T[]
}

const Selector = <T extends Option>({
  value,
  onValueChange,
  fontClassName,
  hideOption = (v) => false,
  options,
}: SelectorProps<T>) => {
  const [selectTriggerRef, animateSelectTriggerRef] = useAnimate();

  const transitionDown = () =>
    animateSelectTriggerRef(
      selectTriggerRef.current,
      {
        rotate: 180,
        scale: 0.9,
      },
      {
        duration: 0.3,
      }
    );
  const transitionUp = () =>
    animateSelectTriggerRef(
      selectTriggerRef.current,
      {
        rotate: 0,
        scale: 1,
      },
      {
        duration: 0.3,
      }
    );

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "w-min space-x-2 whitespace-nowrap border-0 text-lg ring-0 hover:bg-slate-100 hover:font-black hover:underline hover:underline-offset-[6px] focus:border-0 focus:ring-0",
          fontClassName
        )}
        onPointerDown={transitionDown}
        onPointerUp={transitionUp}
        onFocus={transitionUp} //When the user clicks elsewhere
      >
        <SelectValue />
        <ChevronDown ref={selectTriggerRef} className="h-5 w-5" />
      </SelectTrigger>
      <SelectContent
        className={cn(
          "border-2 border-b-4 border-r-4 border-slate-900 pb-1",
          fontClassName
        )}
      >
        {options.map((v, i) => (
          <SelectItem
            className={cn(
              hideOption(v)
                ? "hidden"
                : "whitespace-nowrap rounded-md border-slate-900 pl-8 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:border-2 hover:border-b-[3px] hover:border-r-[3px] hover:bg-white"
            )}
            key={i}
            value={v.value}
          >
            {v.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Selector;
