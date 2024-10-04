import { Link, useStore } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import Header from "src/components/account/components/header";
import Loading from "src/components/account/components/loading";
import { FavoriteProduct } from "src/components/header/desktop";
import useFavoriteProducts from "./useFavoriteProducts";

const FavoriteProducts = () => {
  const store = useStore();
  const { products, isPending, getFavoriteProducts } = useFavoriteProducts();

  const headerTitle = "Favori Ürünlerim" + ` (${products.length})`;

  return (
    <div>
      <Header title={headerTitle} />
      {isPending && <Loading>Yükleniyor...</Loading>}
      {!isPending && products.length === 0 && <NoProducts />}
      {!isPending && !!products.length && (
        <div className="w-full grid grid-cols-2 xs:grid-cols-1 gap-x-5 gap-y-10">
          {products.map((product, index) => {
            return (
              <FavoriteProduct
                key={product.id + index}
                product={product}
                getFavoriteProducts={getFavoriteProducts}
                store={store}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default observer(FavoriteProducts);

const NoProducts = () => {
  return (
    <div className="w-full flex flex-col items-center my-5">
      <h5 className="text-xl xs:text-base mb-4">Favori ürününüz bulunmamaktadır.</h5>
      <Link passHref href="/">
        <a className="underline">Ürünlerimize göz atmak için tıklayınız.</a>
      </Link>
    </div>
  );
};
