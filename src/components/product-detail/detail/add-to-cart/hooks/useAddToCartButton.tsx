import { IkasProduct, useTranslation } from "@ikas/storefront";

import { ProductOptionsStore } from "src/components/product-detail/detail/product-options";
import { useAddToCart } from "src/utils/hooks/useAddToCart";
import { useBackInStockStore } from "../back-in-stock/backInStockStore";
import useBackInStock from "./useBackInStock";
import { useState } from "react";

type Props = {
  product: IkasProduct;
  quantity: number;
};

export default function useAddToCartButton({ product, quantity }: Props) {
  const { t } = useTranslation();
  const backInStockStore = useBackInStockStore();
  const [addToCartButtonText, setAddToCartButtonText] = useState("Sepete Ekle");
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
    ? addToCartButtonText
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
    setAddToCartButtonText("Sepete Eklendi!");
    setTimeout(() => {
      setAddToCartButtonText("Sepete Ekle");
    }, 1000);
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
