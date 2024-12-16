import { observer } from "mobx-react-lite";

import { ProductListProps } from "..";
import { Header } from "./header";
import Pagination from "./pagination";
import Product from "./product";

const Right = ({ productList, isSearchModal }: ProductListProps) => {
  return (
    <div className="w-full">
      {!isSearchModal && <Header productList={productList} />}
      <ul className={`w-full flex flex-wrap ${isSearchModal ? "grid grid-cols-2" : ""}`}>
        {productList.data.map((product) => (
          <Product
            key={product.selectedVariant.id}
            product={product}
            isSearchModal={isSearchModal}
          />
        ))}
      </ul>
      {!isSearchModal && <Pagination productList={productList} />}
    </div>
  );
};

export default observer(Right);
