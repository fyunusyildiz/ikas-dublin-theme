import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "../__generated__/types";
import Detail from "./detail";
import Slider from "./slider";

export const NS = "product-detail"; // for translation (i18n)

const ProductDetail = (props: ProductDetailProps) => {
  return (
    <div>
      <section className="w-full h-[calc(100vh-200px)]">
        <div className="grid grid-cols-[1fr_1fr] mt-5 mb-32 h-full gap-9 lg:grid-cols-[1fr]">
          <Slider {...props} />
          <Detail {...props} />
        </div>
      </section>
    </div>
  );
};

export default observer(ProductDetail);
