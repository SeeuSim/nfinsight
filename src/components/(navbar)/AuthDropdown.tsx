"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const AuthDropDown = ({ children }: { children?: React.ReactNode }) => {
  return (
    <HoverCard openDelay={100} closeDelay={150}>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="inset-0 flex -translate-x-2 translate-y-1 flex-col justify-start space-y-2 rounded-xl border-2 border-slate-900 bg-blue-700 p-2">
        {/* <button className="rounded-xl border-2 border-slate-900 px-4 py-2 text-left bg-white">
          <span className="">Login</span>
        </button> */}
        <button className="rounded-xl border-2 border-slate-900 bg-white px-4 py-2 text-left">
          <span className="">Login With&nbsp;</span>
          Ethereum®
        </button>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AuthDropDown;
