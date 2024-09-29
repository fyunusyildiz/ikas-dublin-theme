import { observer } from "mobx-react-lite";
import { ProductDetailProps } from "src/components/__generated__/types";

export const Price = observer((props: ProductDetailProps) => {
  const { price } = props.product.selectedVariant;
  return (
    <div className="w-fit flex flex-col">
      {price.hasDiscount && (
        <span className="text-base md:text-sm leading-7 line-through text-black mr-2">
          {price.formattedSellPrice}
        </span>
      )}
      <span className="text-[#222] text-lg md:text-base xs:text-xs leading-7">
        {price.formattedFinalPrice}
      </span>
    </div>
  );
});

Price.displayName = "Price";
