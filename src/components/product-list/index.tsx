import { IkasBrand, IkasCategory, IkasProductList } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import Right from "./right";
import useProductList from "./useProductList";

import * as S from "./style";

export type ProductListProps = {
  NS: string;
  source: "brand" | "category" | "search";
  category?: IkasCategory;
  brand?: IkasBrand;
  productList: IkasProductList;
};

function ProductList(props: ProductListProps) {
  useProductList(props.productList);

  return (
    <S.ProductList>
      <div className="w-full">
        <div className="w-full flex flex-col">
          <Right {...props} />
        </div>
      </div>
    </S.ProductList>
  );
}

export default observer(ProductList);
