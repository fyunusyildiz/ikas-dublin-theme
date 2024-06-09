import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "src/components/__generated__/types";

import { AddToCart } from "./add-to-cart";
import { Description } from "./description";
import { FavoriteButton } from "./favorite-button";
import { Price } from "./price";
import { ProductAttributes } from "./product-attributes";
import { ProductOptions } from "./product-options";
import { Title } from "./title";
import { Variants } from "./variants";

const Detail = (props: ProductDetailProps) => {
  return (
    <div className="sticky h-screen md:h-fit md:relative md:top-0 top-32 overflow-y-auto overflow-x-hidden md:px-5 xs:px-3">
      <Title {...props} />
      <FavoriteButton {...props} />
      <Price {...props} />
      <Variants {...props} />
      <ProductOptions {...props} />
      <AddToCart {...props} />
      <ProductAttributes {...props} />
      <Description {...props} />
    </div>
  );
};

export default observer(Detail);
