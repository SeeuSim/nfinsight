import Link from "next/link";

const MobileNavLink = ({ label = "", href = "#" }) => (
  <Link href={href}>
    <span className="cursor-pointer text-xl underline-offset-4 hover:underline">
      {label}
    </span>
  </Link>
);

export default MobileNavLink;
