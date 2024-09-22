import { IkasProduct, Image, Link, useTranslation } from "@ikas/storefront";

import { observer } from "mobx-react-lite";
import * as S from "./style";

type Props = {
  product: IkasProduct;
};

const Product = (props: Props) => {
  const { t } = useTranslation();
  const { product } = props;

  const a11yTitle = product.selectedVariant.hasStock ? "" : "Bu ürün tükendi";

  return (
    <li className="w-1/4 md:w-1/3 sm:w-1/2 relative">
      <Link passHref href={product.href}>
        <a title={a11yTitle}>
          <S.ImageWrapper $hasStock={product.selectedVariant.hasStock}>
            <ProductImage {...props} />
            <DiscountBadge {...props} />
          </S.ImageWrapper>
          <div className="w-full flex flex-wrap justify-between px-2 py-2 xs:flex-col xs:gap-y-2">
            <ProductCategory {...props} />
            <ProductTitle {...props} />
            <Price {...props} />
            <div className="w-full flex items-center justify-between mt-1">
              {product.variantTypes.map((variantType) =>
                variantType.variantType.name === "Beden" ? (
                  <div className="flex gap-1">
                    {product.variantTypes.map((variantType) =>
                      variantType.variantType.name === "Beden"
                        ? variantType.variantType.values.map((value) => (
                            <span
                              key={value.id}
                              className="text-2xs leading-none"
                            >
                              {value.name}
                            </span>
                          ))
                        : null
                    )}
                  </div>
                ) : null
              )}
              <div className="flex gap-1">
                {product.variantTypes.map((variantType) =>
                  variantType.variantType.name === "Renk"
                    ? variantType.variantType.values.map((value) => (
                        <span
                          key={value.id}
                          className={`w-3 h-3 rounded-full border border-solid border-gray-three`}
                          style={{ backgroundColor: value.colorCode || "#fff" }}
                        ></span>
                      ))
                    : null
                )}
              </div>
            </div>
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
    <div className="flex flex-col items-end xs:items-start min-w-[70px]">
      {product.selectedVariant.price.hasDiscount && (
        <span className="text-2xs xs:text-[12px] line-through">
          {product.selectedVariant.price.formattedSellPrice}
        </span>
      )}
      <span className="text-xs font-bold">
        {product.selectedVariant.price.formattedFinalPrice}
      </span>
    </div>
  );
});

const ProductTitle = observer(({ product }: Props) => (
  <p className="text-2xs font-medium uppercase leading-relaxed flex-1">
    {product.name}
  </p>
));
const ProductCategory = observer(({ product }: Props) => (
  <p className="text-[12px] text-[#9e9e9e] font-medium uppercase leading-relaxed w-full">
    {product.brand?.name}
  </p>
));
