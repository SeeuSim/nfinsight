import { TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";

const CollectionExternalLink = ({
  children,
  href,
  helperText,
}: {
  children?: React.ReactNode;
  href: string;
  helperText: string;
}) => (
  <TooltipProvider delayDuration={200} skipDelayDuration={150}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={href}>{children}</Link>
      </TooltipTrigger>
      <TooltipContent
        className="rounded-xl border-2 border-slate-900 bg-white p-2"
        side="bottom"
      >
        {helperText}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default CollectionExternalLink;
