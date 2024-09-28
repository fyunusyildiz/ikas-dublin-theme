import { IkasProduct, Image, Link, useTranslation } from "@ikas/storefront";
import { useAddToCart } from "src/utils/hooks/useAddToCart";

import { observer } from "mobx-react-lite";
import * as S from "./style";

type Props = {
  product: IkasProduct;
};

const Product = (props: Props) => {
  const { t } = useTranslation();
  const { product } = props;
  const { addToCart } = useAddToCart();

  const a11yTitle = product.selectedVariant.hasStock ? "" : "Bu ürün tükendi";

  return (
    <li className="w-1/4 md:w-1/3 sm:w-1/2 relative border border-[#222222d2] group">
      <Link passHref href={product.href}>
        <a title={a11yTitle}>
          <S.ImageWrapper
            className="border-b border-solid border-[#222222d2] relative"
            $hasStock={product.selectedVariant.hasStock}
          >
            <ProductImage {...props} />
            <DiscountBadge {...props} />
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 1);
              }}
              className="w-[90%] hover:bg-[#222] hover:text-white absolute opacity-0 group-hover:opacity-100 bottom-5 left-0 right-0 mx-auto py-3 border border-solid border-[#222] flex items-center justify-center md:!hidden"
            >
              SEPETE EKLE
            </button>
          </S.ImageWrapper>
          <div className="w-full flex flex-wrap justify-between px-2 py-2 xs:flex-col xs:gap-y-2">
            <ProductTitle {...props} />
            <Price {...props} />
          </div>
        </a>
      </Link>
    </li>
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
  const { t } = useTranslation();
  if (
    !product.selectedVariant.price.hasDiscount &&
    product.selectedVariant.hasStock
  )
    return null;
  return (
    <div className="flex flex-col items-center justify-center rounded-full border border-solid border-gray-three absolute right-3 z-10 top-3 bg-white w-14 h-14 xs:w-12 xs:h-12 xs:top-2 xs:right-2">
      {!product.selectedVariant.hasStock && (
        <span className="text-2xs font-semibold leading-none">Tükendi</span>
      )}
      {product.selectedVariant.hasStock && (
        <>
          <span className="text-2xs font-semibold leading-none xs:text-[12px]">
            %{product.selectedVariant.price.discountPercentage}
          </span>
          <span className="text-[10px] leading-tight">İndirim</span>
        </>
      )}
    </div>
  );
});

const Price = observer(({ product }: Props) => {
  return (
    <div className="flex flex-col items-end xs:items-start min-w-[75px]">
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
  <p className="text-[13px] h-[22px] uppercase leading-relaxed flex-1 whitespace-nowrap overflow-hidden relative after:absolute after:h-full after:w-5 after:top-0 after:right-0 after:bg-gradient-to-l after:from-white after:to-transparent after:content-['']">
    {product.name}
  </p>
));
