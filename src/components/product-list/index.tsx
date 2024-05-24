import React from "react";
import { observer } from "mobx-react-lite";
import { IkasBrand, IkasCategory, IkasProductList } from "@ikas/storefront";

import { useScreen } from "src/utils/hooks/useScreen";
import { Container } from "src/components/components/container";
import useProductList from "./useProductList";
import Left from "./left";
import Right from "./right";

import * as S from "./style";

export type ProductListProps = {
  NS: string;
  source: "brand" | "category" | "search";
  category?: IkasCategory;
  brand?: IkasBrand;
  productList: IkasProductList;
};

function ProductList(props: ProductListProps) {
  const { isMobile } = useScreen();
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
