import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "../__generated__/types";
import Detail from "./detail";
import SliderArea from "./slider";
import { Link } from "@ikas/storefront";

export const NS = "product-detail"; // for translation (i18n)

const ProductDetail = (props: ProductDetailProps) => {
  return (
    <section className="w-full">
      <div className="w-full px-5 py-2 xs:pt-1 bg-[#D9D9D9] border-y border-solid border-b-black leading-none">
        {props.product?.categories?.map((category) => (
          <Link key={category.id} passHref href={category.href}>
            <a className="text-[#222] text-2xs xs:text-[10px] uppercase underline">{category.name} {"--> "}</a>
          </Link>
        ))}
        <span className="text-[#222] text-2xs xs:text-[10px] uppercase underline">
          {props.product?.name}
        </span>
      </div>
      <div className="grid grid-cols-10 xs:mt-0 mb-32 h-full gap-9 md:gap-6 xs:gap-0 sm:grid-cols-[1fr]">
        <SliderArea {...props} />
        <Detail {...props} />
      </div>
    </section>
  );
};

export default observer(ProductDetail);
