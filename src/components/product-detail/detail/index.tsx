import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "src/components/__generated__/types";

import { AddToCart } from "./add-to-cart";
import { Description } from "./description";
import { FavoriteButton } from "./favorite-button";
import { Price } from "./price";
import { ProductAttributes } from "./product-attributes";
import { Title } from "./title";
import { Variants } from "./variants";
import { useEffect, useState } from "react";
import { IkasProductAttributeValue } from "@ikas/storefront";

const Detail = (props: ProductDetailProps) => {
  const [storyboxAttr, setStoryboxAttr] =
    useState<IkasProductAttributeValue | null>(null);

  useEffect(() => {
    if (props.product.attributes) {
      const storybox = props.product.attributes.find(
        (attr) => attr.productAttribute?.name === "Storybox"
      );
      if (storybox) {
        setStoryboxAttr(storybox);
      }
    }
  }, [props.product.attributes]);
  return (
    <div className="sticky mt-5 sm:mt-0 col-span-6 max-h-screen sm:h-fit pr-[30px] sm:top-0 top-24 md:top-16 overflow-x-hidden sm:px-5 xs:px-3">
      <div className="w-full flex items-center gap-10 xs:gap-10 sm:border-b sm:border-solid sm:border-[#828282] sm:py-3">
        <Title {...props} />
        <Price {...props} />
      </div>
      <p
        className="w-full font-light mt-6 xs:mt-4 text-xs xs:text-2xs text-black"
        dangerouslySetInnerHTML={{
          __html: storyboxAttr?.value || "",
        }}
      />
      <Description {...props} />
      <Variants {...props} />
      <div className="w-full flex items-center gap-4 sm:mt-3 xs:gap-2">
        <FavoriteButton {...props} />
        <AddToCart {...props} />
      </div>
      <ProductAttributes {...props} />
    </div>
  );
};

export default observer(Detail);
