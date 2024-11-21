import { IkasProduct, Image, Link } from "@ikas/storefront";
import { useState } from "react";
import { useAddToCart } from "src/utils/hooks/useAddToCart";
import CartIcon from "src/components/svg/cart";
import { useRouter } from "next/router";

import { observer } from "mobx-react-lite";
import * as S from "./style";

type Props = {
  product: IkasProduct;
  className?: string;
};

const Product = (props: Props) => {
  const [addToCartText, setAddToCartText] = useState("SEPETE EKLE");
  const { product } = props;
  const { addToCart } = useAddToCart();
  const [showNotify, setShowNotify] = useState(false);
  const router = useRouter();

  const a11yTitle = product.selectedVariant.hasStock ? "" : "Bu ürün tükendi";

  return (
    <>
      <li
        className={`w-1/4 md:w-1/3 sm:w-1/2 relative border border-[#222222d2] group ${props.className}`}
      >
        <Link
          passHref
          href={product.href}
          onClick={(e) => {
            e.preventDefault();
            router.push(product.href);
          }}
        >
          <a title={a11yTitle}>
            <S.ImageWrapper
              className="border-b border-solid border-[#222222d2] relative"
              $hasStock={product.selectedVariant.hasStock}
            >
              <ProductImage {...props} />
              <DiscountBadge {...props} />
              {product.selectedVariant.hasStock && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowNotify(true);
                    addToCart(product, 1);
                    setAddToCartText("SEPETE EKLENDİ");
                    setTimeout(() => {
                      setAddToCartText("SEPETE EKLE");
                      setShowNotify(false);
                    }, 2000);
                  }}
                  className="w-[90%] hover:bg-[#222] hover:text-white absolute opacity-0 group-hover:opacity-100 bottom-5 left-0 right-0 mx-auto py-3 border border-solid border-[#222] flex items-center justify-center md:!hidden"
                >
                  {addToCartText}
                </button>
              )}
            </S.ImageWrapper>
            <div className="w-full flex flex-wrap justify-between px-2 py-2 xs:gap-y-0 xs:flex-col overflow-hidden">
              <ProductTitle {...props} />
              <Price {...props} />
            </div>
          </a>
        </Link>
      </li>
      <div
        className={`fixed flex items-center gap-2 z-[999] top-[10px] right-0 bg-white p-4 border border-solid border-[#222] transition-all duration-300 ${
          showNotify
            ? "-translate-x-2 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <CartIcon stroke="#222" />
        Ürün sepete eklendi!
      </div>
    </>
  );
};

export default observer(Product);

const ProductImage = observer(({ product }: Props) => {
  if (!product.selectedVariant.mainImage?.image?.id) {
    return <img src="/product-dummy-image.jpeg" />;
  }

  return product.selectedVariant.mainImage.image.isVideo ? (
    <video src={product.selectedVariant.mainImage.image.src} />
  ) : (
    <Image
      layout="responsive"
      width="125px"
      height="200px"
      className="object-cover"
      image={product.selectedVariant.mainImage?.image!}
    />
  );
});

const DiscountBadge = observer(({ product }: Props) => {
  if (
    !product.selectedVariant.price.hasDiscount &&
    product.selectedVariant.hasStock
  )
    return null;
  return (
    <div className="flex flex-col items-center justify-center border border-solid border-[#D9D9D9] absolute left-3 z-10 top-3 bg-white p-[10px] xs:p-1">
      {!product.selectedVariant.hasStock && (
        <span className="text-2xs font-semibold leading-none">Tükendi</span>
      )}
      {product.selectedVariant.hasStock && (
        <div className="flex items-center text-[#7A6A48]">
          <svg
            width="34"
            height="9"
            viewBox="0 0 34 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-4 md:mr-3 xs:mr-2"
          >
            <path
              d="M17.014 5.89482L20.2547 8.8562L26.7642 2.90551L32.5752 8.21364L34 6.64914L26.7642 -3.16288e-07L20.2547 5.97864L17.014 2.98932L13.7453 -8.85362e-07L7.23583 5.97864L1.45275 0.6705L-9.76951e-08 2.235L7.23583 8.8562L13.7453 2.90551L17.014 5.89482Z"
              fill="#7A6A49"
            />
          </svg>
          <span className="text-xs xs:text-[12px]">
            %{product.selectedVariant.price.discountPercentage} İNDİRİM
          </span>
        </div>
      )}
    </div>
  );
});

const Price = observer(({ product }: Props) => {
  return (
    <div className="flex flex-col items-end min-w-[75px] xs:min-w-[unset] xs:flex-row xs:gap-2">
      {product.selectedVariant.price.hasDiscount && (
        <span className="text-2xs xs:text-[12px] line-through">
          {product.selectedVariant.price.formattedSellPrice}
        </span>
      )}
      <span className="text-[14px]">
        {product.selectedVariant.price.formattedFinalPrice}
      </span>
    </div>
  );
});

const ProductTitle = observer(({ product }: Props) => (
  <p className="text-[13px] h-[22px] xs:w-full uppercase leading-relaxed flex-1 whitespace-nowrap overflow-hidden relative after:absolute after:h-full after:w-5 after:top-0 after:right-0 after:bg-gradient-to-l after:from-white after:to-transparent after:content-['']">
    {product.name}
  </p>
));
