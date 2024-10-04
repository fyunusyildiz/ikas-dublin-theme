import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  formatCurrency,
  IkasAdjustmentType,
  IkasCart,
  useStore,
  useTranslation,
} from "@ikas/storefront";
import { APIErrorCode } from "@ikas/fe-api-client";

import Item from "./item";
import EmptyCart from "./empty-cart";

import Button from "../components/button";
import { Container } from "../components/container";
import { CartProps } from "../__generated__/types";
import FreeShippingCarSVG from "./svg/freeShippingCar";

import * as S from "./style";
import FormItem from "../components/form/form-item";
import Form from "../components/form";
import Input from "../components/input";
import Row from "../components/grid/row";
import Col from "../components/grid/col";
import Modal from "../components/modal";
import { ArrowRight } from "../slider/components/icons";

export const NS = "cart";

const Cart = (props: CartProps) => {
  const { t } = useTranslation();
  const store = useStore();
  const { cart } = store.cartStore;
  const isCartEmpty = !cart || !cart?.itemCount;
  const title = `Sepetim (${cart?.itemQuantity || 0})`;
  return (
    <div className="w-full">
      {isCartEmpty && <EmptyCart />}
      {!isCartEmpty && (
        <div className="w-full flex flex-col">
          <div className="w-full flex items-end py-10 px-[100px] gap-[20px] border-b border-solid border-[#222]">
            <h6 className="text-[48px] text-[#222] leading-none">Sepet</h6>
            <span className="text-base text-[#222]">
              {cart?.itemQuantity} öğe
            </span>
          </div>
          <section className="grid grid-cols-12 gap-20 w-full justify-between pl-[100px] pr-[30px]">
            <Main />
            <Summary {...props} />
          </section>
        </div>
      )}
    </div>
  );
};

export default observer(Cart);

export const Main = () => {
  return (
    <div className="col-span-8 py-[60px]">
      <Items />
    </div>
  );
};

const Items = observer(() => {
  const store = useStore();
  return (
    <ul className="flex flex-col gap-10">
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
    <S.SummaryButtonWrapper>
      <Button buttonType="default" block anchor href="/">
        Alışverişe Devam Et
      </Button>
      <Button
        size="large"
        className="!flex items-center !justify-between !px-5"
        block
        href={store.cartStore.checkoutUrl}
      >
        Siparişi Tamamla
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path d="M8 16H24M24 16L18 10M24 16L18 22" stroke="white" />
        </svg>
      </Button>
    </S.SummaryButtonWrapper>
  );

  const summaryText = !!props.summaryText ? (
    <S.SummaryFreeShippingText>
      <span>
        <FreeShippingCarSVG />
      </span>
      <span>{props.summaryText}</span>
    </S.SummaryFreeShippingText>
  ) : null;

  return (
    <div className="col-span-4 mt-10">
      <div className="w-full border border-solid border-[#222] p-6">
        <p className="w-full border-b border-solid border-[#222] pb-4 mb-5">
          Sepet Özeti
        </p>
        <div>
          <Coupon />
          {subTotal}
          <Adjustments cart={cart} />
          {totalFinalPrice}
          {summaryButtons}
          {summaryText}
        </div>
      </div>
    </div>
  );
});

const Adjustments = observer(
  ({ cart }: { cart: IkasCart | null | undefined }) => {
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
              <span>
                {adjustment.type === IkasAdjustmentType.DECREMENT ? "-" : "+"}
                {price}
              </span>
            </S.SummaryBoxText>
          );
        })}
      </>
    );
  }
);

const Coupon = observer(() => {
  const { t } = useTranslation();
  const {
    cart,
    pending,
    addCoupon,
    modalText,
    modalVisible,
    removeCoupon,
    couponValue,
    setCouponValue,
    onModalClose,
  } = useCoupon();

  const inputPlaceholder = cart?.couponCode || "Kupon kodunuz";
  const inputStyle = cart?.couponCode
    ? { paddingRight: `${S.REMOVE_COUPON_BUTTON_WIDTH + 5}px` }
    : undefined;

  return (
    <div className="mb-5 pb-5 border-b border-solid border-[#222]">
      <Form onSubmit={addCoupon}>
        <Row align="flex-end" gutter={[8]}>
          <Col span={16}>
            <FormItem noMargin style={{ position: "relative" }}>
              <Input
                placeholder={inputPlaceholder}
                value={couponValue}
                style={inputStyle}
                onChange={(event) => {
                  setCouponValue(event.target.value);
                }}
              />
              {!!cart?.couponCode && (
                <S.RemoveCouponButton
                  title={"Kuponu Kaldır"}
                  type="button"
                  onClick={removeCoupon}
                >
                  <RemoveCouponSVG />
                </S.RemoveCouponButton>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <Button
              block
              type="submit"
              size="small"
              loading={pending}
              disabled={pending || !couponValue}
            >
              Ekle
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal visible={modalVisible} onClose={onModalClose}>
        <p>{modalText}</p>
      </Modal>
    </div>
  );
});

function useCoupon() {
  const store = useStore();
  const { t } = useTranslation();
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
        setModalText(t(`${NS}:coupon.error.couponCodeNotExist`));
      } else {
        setModalText(t(`${NS}:coupon.error.unknown`));
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

export const RemoveCouponSVG = () => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    stroke-linejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
    <line x1="18" y1="9" x2="12" y2="15"></line>
    <line x1="12" y1="9" x2="18" y2="15"></line>
  </svg>
);
