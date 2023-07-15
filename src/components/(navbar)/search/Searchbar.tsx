"use client";

import { Search } from "lucide-react";

import PopoutIcon from "@/components/buttons/PopoutIcon";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Command,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const Searchbar = ({ className = "" }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn("group max-h-min !outline-none", className)}
      >
        <PopoutIcon hoverBg="bg-blue-700">
          <Search className="text-slate-900 group-hover:text-slate-100" />
        </PopoutIcon>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 !w-[80vw] max-w-screen-md">
        <Command className="xl:max-w-screen-xl pt-1">
          <CommandInput
            className="text-base"
            placeholder="Search for collections"
          />
          <CommandList>
          </CommandList>  
        </Command>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Searchbar;
