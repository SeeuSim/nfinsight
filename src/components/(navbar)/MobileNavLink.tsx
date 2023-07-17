import Link from "next/link";
import { SheetClose } from "../ui/sheet";

const MobileNavLink = ({
  label = "",
  href = "#",
}: {
  label: string;
  href: string;
}) => (
  <Link href={href}>
    <SheetClose className="h-full w-full text-left !outline-none">
      <span className="cursor-pointer text-xl underline-offset-4 hover:underline">
        {label}
      </span>
    </SheetClose>
  </Link>
);

export default MobileNavLink;
