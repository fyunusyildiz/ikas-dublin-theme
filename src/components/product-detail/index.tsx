import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "../__generated__/types";
import Detail from "./detail";
import SliderArea from "./slider";

export const NS = "product-detail"; // for translation (i18n)

const ProductDetail = (props: ProductDetailProps) => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-10 xs:mt-0 mb-32 h-full gap-9 md:gap-6 xs:gap-0 sm:grid-cols-[1fr]">
        <SliderArea {...props} />
        <Detail {...props} />
      </div>
    </section>
  );
};

export default observer(ProductDetail);
