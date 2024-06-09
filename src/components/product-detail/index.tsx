import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "../__generated__/types";
import Detail from "./detail";
import Slider from "./slider";

export const NS = "product-detail"; // for translation (i18n)

const ProductDetail = (props: ProductDetailProps) => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-[2fr_1fr] mt-5 mb-32 h-full gap-9 lg:grid-cols-[1fr]">
        <Slider {...props} />
        <Detail {...props} />
      </div>
    </section>
  );
};

export default observer(ProductDetail);
