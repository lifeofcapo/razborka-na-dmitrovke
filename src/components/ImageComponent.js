import Image from 'next/image';
import React from 'react';

const ImageComponent = ({
  src,
  alt = "",
  className = "",
  priority = false,
  fill = true,
  objectFit = 'contain', 
  ...props
}) => {
  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '100%' }}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        style={{ objectFit: objectFit }}
        {...props}
      />
    </div>
  );
};

export default ImageComponent;