import { APIErrorCode } from "@ikas/fe-api-client";
import {
  formatCurrency,
  IkasAdjustmentType,
  IkasCart,
  Link,
  useStore,
} from "@ikas/storefront";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import EmptyCart from "./empty-cart";
import Item from "./item";

import { CartProps } from "../__generated__/types";
import ShippingIcon from "./svg/shipping";
import ReturnIcon from "./svg/return";

import Form from "../components/form";
import Input from "../components/input";
import Modal from "../components/modal";
import RemoveSVG from "./item/svg/remove";
import * as S from "./style";

export const NS = "cart";

const Cart = (props: CartProps) => {
  const store = useStore();
  const { cart } = store.cartStore;
  const isCartEmpty = !cart || !cart?.itemCount;
  return (
    <div className="w-full">
      {isCartEmpty && <EmptyCart />}
      {!isCartEmpty && (
        <div className="w-full flex flex-col">
          <div className="w-full flex items-end py-10 px-[100px] sm:p-6 gap-[20px] sm:gap-5 xs:gap-3 border-b border-solid border-[#222]">
            <h6 className="text-[48px] text-[#222] leading-none xs:leading-10 sm:text-2xl xs:text-xl">
              Sepet
            </h6>
            <span className="text-base text-[#222] sm:text-sm xs:text-xs">
              {cart?.itemQuantity} öğe
            </span>
          </div>
          <section className="grid grid-cols-12 gap-20 w-full justify-between pl-[100px] pr-[30px] md:px-10 sm:px-6 md:gap-10 pb-20 xs:pt-6 xs:flex xs:flex-col">
            <Main />
            <Summary {...props} />
          </section>
          <div className="w-full py-20 bg-[#F5F5F5] flex items-center px-[100px] md:px-10 sm:px-6 sm:py-10 gap-[200px] sm:gap-6 xs:gap-10 xs:flex-col">
            <div className="flex items-center gap-[10px] xs:w-full">
              <ShippingIcon />
              <div className="flex xs:flex-1 flex-col font-normal text-xs">
                Ücretsiz Kargo
                <span className="font-light">
                  {props.freeShippingLimit} TL üzeri siparişlerde yurt içine
                  ücretsiz kargo.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-[10px] xs:w-full">
              <ReturnIcon />
              <div className="flex xs:flex-1 flex-col font-normal text-xs">
                Ücretsiz İade
                <span className="font-light">
                  {props.refundDayLimit} gün içinde ücretsiz iade.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(Cart);

export const Main = () => {
  return (
    <div className="col-span-8 pt-[60px] xs:w-full sm:pt-10 xs:pt-0 sm:col-span-12">
      <Items />
    </div>
  );
};

type ItemsProps = {
  insidePadding?: boolean;
};

export const Items = observer(({ insidePadding }: ItemsProps) => {
  const store = useStore();
  return (
    <ul className={`flex flex-col gap-10 ${insidePadding && "p-10 sm:p-6"}`}>
      {store.cartStore.cart?.items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
});

const Summary = observer((props: CartProps) => {
  const store = useStore();
  const cart = store.cartStore.cart;

  const subTotal = (
    <S.SummaryBoxText>
      <span>Ara Toplam</span>
      <span>{cart?.formattedTotalPrice}</span>
    </S.SummaryBoxText>
  );

  const totalFinalPrice = (
    <S.TotalFinalPrice>
      <span>Genel Toplam</span>
      <span>{cart?.formattedTotalFinalPrice}</span>
    </S.TotalFinalPrice>
  );

  const summaryButtons = (
    <div className="mt-4">
      <Link href="/" passHref>
        <a className="w-full text-center block py-5 xs:py-3 hover:underline">
          Alışverişe Devam Et
        </a>
      </Link>
      <Link href={store.cartStore.checkoutUrl || "/"} passHref>
        <a className="flex items-center justify-between px-5 py-3 group bg-[#222] text-white">
          Siparişi Tamamla
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="transform group-hover:translate-x-2 transition-transform duration-300"
          >
            <path d="M8 16H24M24 16L18 10M24 16L18 22" stroke="white" />
          </svg>
        </a>
      </Link>
    </div>
  );

  return (
    <div className="col-span-4 h-fit mt-10 sm:col-span-12 xs:mt-4 sticky top-28 sm:relative sm:top-0">
      <div className="w-full border border-solid border-[#222] p-6 xs:p-5">
        <p className="w-full text-base border-b border-solid border-[#222] pb-4 mb-5">
          Sipariş Özeti
        </p>
        <div className="w-full flex flex-col">
          <Coupon />
          {subTotal}
          <Adjustments cart={cart} />
          {totalFinalPrice}
          {summaryButtons}
        </div>
      </div>
    </div>
  );
});

const Adjustments = observer(
  ({ cart }: { cart: IkasCart | null | undefined }) => {
    const { removeCoupon } = useCoupon();
    return (
      <>
        {cart?.orderAdjustments?.map((adjustment, index) => {
          const price = formatCurrency(
            adjustment.amount,
            cart.currencyCode,
            cart.currencySymbol
          );
          return (
            <S.SummaryBoxText key={index}>
              <span>{adjustment.name}</span>
              <div className="flex relative items-center">
                <span className="leading-none">
                  {adjustment.type === IkasAdjustmentType.DECREMENT ? "-" : "+"}
                  {price}
                </span>
                {!!cart?.couponCode && (
                  <button
                    title={"Kuponu Kaldır"}
                    type="button"
                    onClick={removeCoupon}
                    className="text-orange-two absolute -right-[22px] top-0 xs:-right-4 xs:top-[2.5px]"
                  >
                    <RemoveSVG className="w-5 h-5 xs:w-4 xs:h-4" fillRed />
                  </button>
                )}
              </div>
            </S.SummaryBoxText>
          );
        })}
      </>
    );
  }
);

const Coupon = observer(() => {
  const {
    cart,
    pending,
    addCoupon,
    modalText,
    modalVisible,
    couponValue,
    setCouponValue,
    onModalClose,
  } = useCoupon();

  const inputPlaceholder = cart?.couponCode || "Kupon kodunuz";
  const inputStyle = cart?.couponCode
    ? { paddingRight: `${S.REMOVE_COUPON_BUTTON_WIDTH + 5}px` }
    : undefined;

  console.log(modalVisible);
  return (
    <div className="mb-5 pb-5 border-b border-solid border-[#222]">
      <Form onSubmit={addCoupon} className="w-full flex justify-between gap-3">
        <Input
          placeholder={inputPlaceholder}
          value={couponValue}
          style={inputStyle}
          status={modalVisible ? "error" : undefined}
          onChange={(event) => {
            setCouponValue(event.target.value);
          }}
          wrapperClassName="flex-1"
        />
        <button
          type="submit"
          className="px-5 h-[42px] flex items-center border border-solid border-[#222] disabled:cursor-not-allowed"
          disabled={pending || !couponValue}
        >
          Ekle
        </button>
      </Form>
      <Modal
        title="Kupon Kodu Ekleme"
        visible={modalVisible}
        onClose={onModalClose}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
});

function useCoupon() {
  const store = useStore();
  const [pending, setPending] = useState(false);
  const [couponValue, setCouponValue] = useState<string>("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState<string>();

  const cart = store.cartStore.cart;

  const addCoupon = async () => {
    setPending(true);
    const result = await store.cartStore.saveCouponCode(couponValue);
    setPending(false);
    setCouponValue("");

    if (!result.success && result.response) {
      const couponError = result?.response?.errorCodes.findIndex(
        (code) => code === ("COUPON_CODE_NOT_EXIST" as APIErrorCode)
      );

      if (couponError !== -1) {
        setModalText("Bu kupon kullanılabilir değil.");
      } else {
        setModalText("Kupon eklenirken bir hata oluştu.");
      }
      setModalVisible(true);
      return;
    }
  };

  const removeCoupon = async () => {
    setPending(true);
    await store.cartStore.saveCouponCode(null);
    setPending(false);
  };

  const onModalClose = () => {
    setModalVisible(false);
    setModalText("");
  };

  return {
    pending,
    cart,
    modalVisible,
    modalText,
    addCoupon,
    removeCoupon,
    couponValue,
    setCouponValue,
    onModalClose,
  };
}