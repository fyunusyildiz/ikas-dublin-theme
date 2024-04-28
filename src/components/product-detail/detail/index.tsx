import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "src/components/__generated__/types";

import { AddToCart } from "./add-to-cart";
import { Description } from "./description";
import { FavoriteButton } from "./favorite-button";
import { Price } from "./price";
import { ProductAttributes } from "./product-attributes";
import { ProductOptions } from "./product-options";
import { SocialShare } from "./social-share";
import { Title } from "./title";
import { Variants } from "./variants";

const Detail = (props: ProductDetailProps) => {
  return (
    <div className="relative h-full overflow-y-auto overflow-x-hidden">
      <Title {...props} />
      <FavoriteButton {...props} />
      <Price {...props} />
      <Variants {...props} />
      <ProductOptions {...props} />
      <AddToCart {...props} />
      <ProductAttributes {...props} />
      <Description {...props} />
      <SocialShare {...props} />
    </div>
  );
};

export default observer(Detail);
