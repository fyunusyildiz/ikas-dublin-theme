import { IkasProduct, useStore } from "@ikas/storefront";
import { useEffect, useState, useRef } from "react";

export default function useFavoriteProducts() {
  const store = useStore();
  const [isPending, setPending] = useState(true);
  const [products, setProducts] = useState<IkasProduct[]>([]);
  const isMounted = useRef(true); // useRef ile isMounted oluşturuyoruz

  const getFavoriteProducts = async () => {
    try {
      const result = await store.customerStore.getFavoriteProducts();
      result.forEach((p) => {
        p.selectedVariantValues = p.variants[0].variantValues;
      });

      // Bileşen hala monte edilmişse state güncellemesi yap
      if (isMounted.current) {
        setProducts(result);
      }
    } catch (error) {
      console.error("Error on getFavoriteProducts");
    } finally {
      // Bileşen hala monte edilmişse state güncellemesi yap
      if (isMounted.current) {
        setPending(false);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true; // Bileşen monte edildiğinde true yapıyoruz
    getFavoriteProducts();

    return () => {
      isMounted.current = false; // Bileşen unmount olduğunda false yapıyoruz
    };
  }, []);

  return {
    isPending,
    products,
    getFavoriteProducts,
  };
}
