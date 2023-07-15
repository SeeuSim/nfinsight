import Image from "next/image";
import { Suspense, useState } from "react";

const CollectionThumbnail = ({ src, size }: { src: string; size: number }) => {
  const [isError, setIsError] = useState(false);
  const imageClass =
    "rounded-xl border-2 border-accent-foreground object-cover hover:-translate-x-[1px] hover:-translate-y-[1px] hover:border-b-4 hover:border-r-4";
  return (
    <Suspense
      fallback={
        <Image
          src={"/images/collection_fallback.webp"}
          width={size}
          height={size}
          alt="Collection Artwork"
          className={imageClass}
        />
      }
    >
      <div className={`w-[${size}px] h-[${size}px]`}>
        <Image
          src={isError ? "/images/collection_fallback.webp" : src}
          alt="Collection Artwork"
          className={imageClass}
          width={size}
          height={size}
          onError={() => setIsError(true)}
        />
      </div>
    </Suspense>
  );
};

export default CollectionThumbnail;
