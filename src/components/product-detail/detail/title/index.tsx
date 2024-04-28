import { ProductDetailProps } from "src/components/__generated__/types";

export const Title = (props: ProductDetailProps) => {
  return (
    <h1 className="font-light text-[28px] leading-[48px] text-black pr-8 mb-3">
      {props.product.name}
    </h1>
  );
};
