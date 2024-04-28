import { observer } from "mobx-react-lite";
import { ProductDetailProps } from "src/components/__generated__/types";

export const Price = observer((props: ProductDetailProps) => {
  const { price } = props.product.selectedVariant;
  return (
    <div className="mb-6">
      {price.hasDiscount && (
        <span className="text-base leading-7 line-through text-black mr-2">
          {price.formattedSellPrice}
        </span>
      )}
      <span className="text-google-green font-semibold text-base leading-7">
        {price.formattedFinalPrice}
      </span>
    </div>
  );
});

Price.displayName = "Price";
