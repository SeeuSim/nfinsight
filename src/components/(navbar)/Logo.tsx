import Image from "next/image";
import Link from "next/link";

const Logo = ({ copyText = "" }) => {
  return (
    <Link href="/">
      <div className="group mt-2 inline-flex items-center px-2">
        <Image
          src="/images/nfinsight_logo.png"
          width={64}
          height={64}
          alt={copyText}
        />
        <div className="relative p-0">
          <span className="text-lg font-bold italic group-hover:text-blue-500 mob:text-xl mobp:text-2xl sm:text-3xl">
            {copyText}
          </span>
          <span className="absolute -translate-x-full text-lg font-bold italic duration-300 group-hover:-translate-x-[calc(100%+1px)] group-hover:-translate-y-[1px] mob:text-xl mobp:text-2xl sm:text-3xl">
            {copyText}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
