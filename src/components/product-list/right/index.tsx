import { observer } from "mobx-react-lite";

import { ProductListProps } from "..";
import { Header } from "./header";
import Pagination from "./pagination";
import Product from "./product";


const Right = ({ productList }: ProductListProps) => {
  return (
    <div className="w-full mt-10">
      <Header productList={productList} />
      <ul className="w-full flex flex-wrap">
        {productList.data.map((product) => (
          <Product key={product.selectedVariant.id} product={product} />
        ))}
      </ul>
      <Pagination productList={productList} />
    </div>
  );
};

export default observer(Right);
