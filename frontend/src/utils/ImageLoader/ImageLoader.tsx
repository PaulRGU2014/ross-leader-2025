'use client'

import Image, { ImageProps} from "next/image";
import { urlForImage } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import React from 'react';

interface ImageLoaderProps extends React.HTMLProps<HTMLDivElement> {
  className: string;
  style?: object;
  objectFit?: string;
  objectPosition?: string;
  priority?: boolean;
  src: string;
  alt: string;
}

const ImageLoader = React.forwardRef<HTMLDivElement, ImageLoaderProps>(
  ({ className, style, src, alt, objectFit="cover", objectPosition, priority, ...rest }, ref) => {
    return (
      <div className={className} 
        style={style}
        ref={ref}
        {...rest}
      >
        <Image 
          src="src"
          alt={alt} 
          fill={true}
          sizes="100%"
          style={{
            objectFit: objectFit as React.CSSProperties['objectFit'],
            objectPosition: objectPosition as React.CSSProperties['objectPosition']
          }}
          loader={({ width, quality = 100 }) =>
            urlForImage(src).width(width).quality(quality).url()
          }
          priority={priority ? priority : false}
        />
      </div>
    );
  }
);

ImageLoader.displayName = 'ImageLoader';

export default ImageLoader;