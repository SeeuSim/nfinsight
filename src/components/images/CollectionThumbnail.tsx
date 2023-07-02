import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { useState } from "react";

const CollectionThumbnail = ({ src, size }: { src: string; size: number }) => {
  const [isError, setIsError] = useState(false);
  return (
    <div className={`w-[${size}px]`}>
      <AspectRatio ratio={1}>
        <Image
          src={isError ? "/images/collection_fallback.webp" : src}
          alt="Collection Artwork"
          width={size}
          height={size}
          className="rounded-md border-slate-900 object-cover hover:border-2 hover:border-b-4 hover:border-r-4 "
          onError={() => setIsError(true)}
        />
      </AspectRatio>
    </div>
  );
};

export default CollectionThumbnail
