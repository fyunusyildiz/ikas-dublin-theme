import { ProductDetailProps } from "src/components/__generated__/types";

export const Title = (props: ProductDetailProps) => {
  return (
    <h1 className="font-light text-lg md:text-base xs:text-xs text-[#222] flex flex-1">
      {props.product.name}
    </h1>
  );
};
