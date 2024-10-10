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
    <div className="flex flex-1 gap-3 xs:gap-2">
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
      <button
        className="w-full flex flex-1 justify-center items-center h-[60px] md:h-[50px] bg-[#222] text-white uppercase"
        disabled={disabled}
        onClick={onButtonClick}
      >
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
  quantity: number;
  onChange: (value: number) => void;
  lightBackground?: boolean;
};

export const QuantityButton = ({
  quantity,
  onChange,
  lightBackground,
}: QuantityButtonProps) => {
  const handleDecrease = () => {
    if (!(quantity > 1)) return;
    onChange(quantity - 1);
  };

  const handleIncrease = () => {
    onChange(quantity + 1);
  };

  return (
    <div
      className={`relative w-[105px] sm:w-[90px] flex items-center h-[60px] md:h-[50px] shrink-0 overflow-hidden text-[#222] ${
        lightBackground ? "bg-[#f8f8f8]" : "bg-[#d9d9d9]"
      }`}
    >
      <button
        className="w-[35px] xs:w-[25px] h-full inline-block focus:outline-none"
        onClick={handleDecrease}
      >
        <MinusSVG />
      </button>
      <span className="inline-block text-center w-[calc(100%-70px)] px-[10px] xs:w-[calc(100%-50px)]">
        {quantity}
      </span>
      <button
        className="w-[35px] xs:w-[25px] h-full inline-block focus:outline-none"
        onClick={handleIncrease}
      >
        <PlusSVG />
      </button>
    </div>
  );
};

const MinusSVG = () => (
  <svg
    width="12"
    height="12"
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
    width="12"
    height="12"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full"
  >
    <path d="M0 4H8" stroke="#22252A" />
    <path d="M4 8L4 2.38419e-07" stroke="#22252A" />
  </svg>
);
