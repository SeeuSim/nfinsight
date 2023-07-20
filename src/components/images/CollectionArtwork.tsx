"use client";

import Image from "next/image";
import { useState } from "react";

const CollectionArtwork = ({
  src,
  alt,
  altSrc,
}: React.HTMLProps<HTMLImageElement> & { altSrc?: string }) => {
  const [isError, setIsError] = useState(false);
  return (
    <Image
      className="flex-shrink-0 object-cover mix-blend-normal"
      src={isError ? altSrc ?? "/images/collection_fallback.webp" : src ?? ""}
      alt={alt ?? ""}
      fill
      onError={() => setIsError(true)}
      quality={100}
    />
  );
};

export default CollectionArtwork;
