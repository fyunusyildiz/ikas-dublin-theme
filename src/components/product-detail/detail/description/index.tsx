import { ProductDetailProps } from "src/components/__generated__/types";

export const Description = (props: ProductDetailProps) => {
  if (!props.product.description) return null;
  return (
    <div className="md:pb-6 xs:py-2 my-6 xs:my-0 w-full border-b-0 sm:border-b-[1px] border-solid border-[#222]">
      <div
        className={`font-light text-xs xs:text-2xs leading-7 text-black`}
        dangerouslySetInnerHTML={{ __html: props.product.description }}
      />
    </div>
  );
};
