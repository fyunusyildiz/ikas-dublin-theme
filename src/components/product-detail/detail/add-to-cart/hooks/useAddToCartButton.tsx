import { IkasProduct, useTranslation } from "@ikas/storefront";

import { ProductOptionsStore } from "src/components/product-detail/detail/product-options";
import { useAddToCart } from "src/utils/hooks/useAddToCart";
import { useBackInStockStore } from "../back-in-stock/backInStockStore";
import useBackInStock from "./useBackInStock";

type Props = {
  product: IkasProduct;
  quantity: number;
};

export default function useAddToCartButton({ product, quantity }: Props) {
  const { t } = useTranslation();
  const backInStockStore = useBackInStockStore();
  const { loading: addToCartLoading, addToCart } = useAddToCart();
  const {
    isBackInStockEnabled,
    isBackInStockReminderSaved,
    handleBackInStockClick,
  } = useBackInStock({ product });

  const hasStock = product.selectedVariant.hasStock;
  const loading = addToCartLoading || backInStockStore.pending;
  const disabled = hasStock
    ? addToCartLoading
    : !isBackInStockEnabled ||
      isBackInStockReminderSaved ||
      backInStockStore.pending;

  const buttonText = hasStock
    ? "Sepete Ekle"
    : isBackInStockEnabled
    ? isBackInStockReminderSaved
      ? "Hatırlatma Kaydedildi"
      : "Gelince Haber Ver"
    : "Tükendi";

  const buttonState: "addToCart" | "backInStock" =
    isBackInStockEnabled && !hasStock ? "backInStock" : "addToCart";

  const handleAddToCartClick = async () => {
    if (!product.isAddToCartEnabled) {
      ProductOptionsStore.getInstance().showOptionError = true;
      return;
    }
    addToCart(product, quantity);
  };

  const onButtonClick =
    buttonState === "backInStock"
      ? handleBackInStockClick
      : handleAddToCartClick;

  return {
    loading,
    hasStock,
    isBackInStockReminderSaved,
    disabled,
    buttonState,
    buttonText,
    onButtonClick,
  };
}
