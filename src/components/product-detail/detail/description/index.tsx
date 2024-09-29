import { useTranslation } from "@ikas/storefront";
import { useState } from "react";

import { ProductDetailProps } from "src/components/__generated__/types";
import { NS } from "src/components/product-detail";

export const Description = (props: ProductDetailProps) => {
  if (!props.product.description) return null;
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="border-t border-b border-solid border-t-[#222] border-b-[#222] py-3 md:py-2 mt-10 xs:mt-6 w-full">
      <button
        className="font-normal text-sm xs:text-xs leading-8 text-[#222] w-full flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Özellikler
        <div className="w-3 h-3">{isExpanded ? <MinusSVG /> : <PlusSVG />}</div>
      </button>
      <div
        className={`font-light text-xs leading-7 text-black ${
          isExpanded ? "block" : "hidden"
        }`}
        dangerouslySetInnerHTML={{ __html: props.product.description }}
      />
    </div>
  );
};

const MinusSVG = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full"
  >
    <path d="M0 4H8" stroke="#22252A" />
  </svg>
);

const PlusSVG = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full"
  >
    <path d="M0 4H8" stroke="#22252A" />
    <path d="M4 8L4 2.38419e-07" stroke="#22252A" />
  </svg>
);
