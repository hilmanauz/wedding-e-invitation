import React, { ForwardRefRenderFunction, forwardRef, memo } from "react";
import { ImageProps } from "./image.types";
import ImageComp from "next/image";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#999" offset="20%" />
      <stop stop-color="#888" offset="50%" />
      <stop stop-color="#999" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#999" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const src = "http://172.31.188.64:30625/public/uploads";

const toBase64 = (str: string) =>
    typeof window === "undefined"
        ? Buffer.from(str).toString("base64")
        : window.btoa(str);

const ImageComponent: ForwardRefRenderFunction<HTMLImageElement, ImageProps> = (
    { className, placeholder, withPlaceholder, ...props },
    ref
): JSX.Element => {
    const isSvg = React.useMemo(
        () =>
            typeof props.src !== "string"
                ? // @ts-ignore
                  props.src?.src.includes(".svg")
                : false,
        [props.src]
    );
    return (
        <ImageComp
            {...props}
            className={className}
            src={
                props.src ||
                `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/placeholder.svg`
            }
            loader={
                isSvg
                    ? undefined
                    : () =>
                          props.src ||
                          `${
                              process.env.NEXT_PUBLIC_BASE_PATH || ""
                          }/images/placeholder.PNG`
            }
            placeholder={
                withPlaceholder
                    ? placeholder ||
                      `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`
                    : "empty"
            }
            ref={ref}
        />
    );
};

export const Image = memo(forwardRef(ImageComponent));
