import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "src/components/__generated__/types";

import { AddToCart } from "./add-to-cart";
import { Description } from "./description";
import { FavoriteButton } from "./favorite-button";
import { Price } from "./price";
import { ProductAttributes } from "./product-attributes";
import { Title } from "./title";
import { Variants } from "./variants";

const Detail = (props: ProductDetailProps) => {
  const storyboxAttr = props.product.attributes.filter(
    (attribute) => attribute.productAttribute?.name === "Storybox"
  );
  return (
    <div className="sticky col-span-6 h-[80vh] sm:h-fit pr-[30px] sm:top-0 top-32 md:top-28 overflow-y-auto overflow-x-hidden sm:px-5 xs:px-3">
      <div className="w-full flex items-center gap-10 xs:gap-10 sm:border-b sm:border-solid sm:border-[#828282] sm:py-3">
        <Title {...props} />
        <Price {...props} />
      </div>
      {storyboxAttr.length > 0 && (
        <p
          className="w-full mt-6 xs:mt-4 text-xs xs:text-2xs text-black"
          dangerouslySetInnerHTML={{
            __html: storyboxAttr[0].value || "",
          }}
        />
      )}
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
