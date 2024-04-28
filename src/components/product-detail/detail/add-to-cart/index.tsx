import { IkasProduct } from "@ikas/storefront";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import { ProductDetailProps } from "src/components/__generated__/types";
import { BackInStock } from "./back-in-stock";
import useAddToCartButton from "./hooks/useAddToCartButton";

import BellSVG from "./svg/bs-bell";
import BellFillSVG from "./svg/bs-bell-fill";

export const AddToCart = observer((props: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex gap-3">
      <QuantityButton quantity={quantity} onChange={setQuantity} />
      <AddToCartButton product={props.product} quantity={quantity} />
      <BackInStock product={props.product} />
    </div>
  );
});

AddToCart.displayName = "AddToCart";

type AddToCartButtonProps = {
  product: IkasProduct;
  quantity: number;
};

const AddToCartButton = observer(
  ({ product, quantity }: AddToCartButtonProps) => {
    const {
      loading,
      buttonText,
      buttonState,
      disabled,
      isBackInStockReminderSaved,
      onButtonClick,
    } = useAddToCartButton({
      product,
      quantity,
    });

    return (
      <button className="w-full" disabled={disabled} onClick={onButtonClick}>
        {buttonText}
        {buttonState === "backInStock" && (
          <span className="ml-2">
            {isBackInStockReminderSaved && <BellFillSVG />}
            {!isBackInStockReminderSaved && <BellSVG />}
          </span>
        )}
      </button>
    );
  }
);

type QuantityButtonProps = {
  isFullWidth?: boolean;
  quantity: number;
  onChange: (value: number) => void;
};

export const QuantityButton = ({
  isFullWidth = true,
  quantity,
  onChange,
}: QuantityButtonProps) => {
  const handleDecrease = () => {
    if (!(quantity > 1)) return;
    onChange(quantity - 1);
  };

  const handleIncrease = () => {
    onChange(quantity + 1);
  };

  return (
    <div className="relative inline-block rounded-[12px] h-12 shrink-0 overflow-hidden bg-gray-one border border-solid border-gray-two text-black">
      <button
        className="w-[35px] h-full inline-block focus:outline-none hover:bg-gray-two focus-visible:bg-gray-two"
        onClick={handleDecrease}
      >
        <MinusSVG />
      </button>
      <span className="inline-block text-center w-[calc(100%-70px)] px-[10px]">
        {quantity}
      </span>
      <button
        className="w-[35px] h-full inline-block focus:outline-none hover:bg-gray-two focus-visible:bg-gray-two"
        onClick={handleIncrease}
      >
        <PlusSVG />
      </button>
    </div>
  );
};

const MinusSVG = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full"
  >
    <path d="M0 4H8" stroke="#22252A" />
  </svg>
);

const PlusSVG = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full"
  >
    <path d="M0 4H8" stroke="#22252A" />
    <path d="M4 8L4 2.38419e-07" stroke="#22252A" />
  </svg>
);
