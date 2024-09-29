import React from "react";
import { IkasImage } from "@ikas/storefront";

type SwatchProps = {
  selected: boolean;
  title: string;
  image?: IkasImage | null;
  colorCode?: string | null;
  onClick: () => void;
};

export const Swatch = ({
  title,
  selected,
  colorCode,
  image,
  onClick,
}: SwatchProps) => {
  if (image?.id) {
    return (
      <button
        title={title}
        onClick={onClick}
        className={`w-10 h-10 md:w-8 md:h-8 xs:w-7 xs:h-7 cursor-pointer border border-solid disabled:opacity-50 ${
          selected ? "border-[#222]" : "border-transparent"
        }`}
      >
        <img
          src={image?.thumbnailSrc}
          className="w-full h-full object-cover object-center"
        />
      </button>
    );
  }

  return (
    <button
      title={title}
      onClick={onClick}
      className={`cursor-pointer w-10 m-0 h-10 border border-solid md:w-8 md:h-8 xs:w-7 xs:h-7 ${
        selected ? "border-[#222]" : "border-gray-two"
      } p-0`}
      style={{ backgroundColor: colorCode ? `${colorCode}` : "transparent" }}
    />
  );
};
