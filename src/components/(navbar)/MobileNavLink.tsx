import Link from "next/link";

const MobileNavLink = ({ text = "", href = "#" }) => (
  <Link href={href}>
    <span className="cursor-pointer text-xl underline-offset-4 hover:underline">
      {text}
    </span>
  </Link>
);

export default MobileNavLink;
