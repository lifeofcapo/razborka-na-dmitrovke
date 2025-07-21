import Image from "next/image";
import type { ImageProps } from "next/image";
import React from "react";

interface ImageComponentProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt?: string;
  className?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt = "",
  className = "",
  priority = false,
  fill = true,
  objectFit = "contain",
  ...props
}) => {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: "100%", height: "100%" }}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        style={{ objectFit }}
        {...props}
      />
    </div>
  );
};

export default ImageComponent;
