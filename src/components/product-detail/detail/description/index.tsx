import { useTranslation } from "@ikas/storefront";

import { ProductDetailProps } from "src/components/__generated__/types";
import { NS } from "src/components/product-detail";

export const Description = (props: ProductDetailProps) => {
  const { t } = useTranslation();
  if (!props.product.description) return null;
  return (
    <div className="border-t border-b border-solid border-t-gray-two border-b-gray-two py-3 mt-8 mb-5">
      <p className="font-normal text-sm leading-8 text-black">
        {t(`${NS}:detail.description.title`)}
      </p>
      <div
        className="font-light text-xs leading-7 text-black"
        dangerouslySetInnerHTML={{ __html: props.product.description }}
      />
    </div>
  );
};
