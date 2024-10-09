import {
  formatCurrency,
  IkasBaseStore,
  IkasOrderLineItem,
  IkasOrderLineItemOption,
  IkasOrderLineItemOptionValue,
  IkasProductOptionType,
  Image,
  Link,
  useStore,
} from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import { Swatch } from "src/components/components/swatch/";
import { QuantityButton } from "src/components/product-detail/detail/add-to-cart";
import ProductImagePlaceholder from "src/components/svg/product-image-placeholder";
import { maxQuantityPerCartHandler } from "src/utils/hooks/useAddToCart";

import AiOutlineCloudDownloadSVG from "./svg/ai-outline-cloud-download";
import RemoveSVG from "./svg/remove";

import * as S from "./style";

const Item = ({ item }: { item: IkasOrderLineItem }) => {
  const store = useStore();

  return (
    <li className="w-full flex xs:flex-col items-stretch gap-6 last:border-b-0 xs:border-b xs:border-solid xs:border-[#222] xs:pb-8 xs:items-start">
      <ItemImage item={item} />
      <div className="flex-1 flex flex-col justify-between">
        <ItemProductColumn item={item} store={store} />
        <div className="flex items-center gap-3 xs:mt-3">
          <ItemQuantityColumn item={item} store={store} />
          <ItemRemoveColumn item={item} store={store} />
        </div>
      </div>
      <ItemPriceColumn item={item} />
    </li>
  );
};

export default observer(Item);

const ItemProductColumn = observer(
  ({ item, store }: { item: IkasOrderLineItem; store: IkasBaseStore }) => {
    const colorVariant = item.variant.variantValues?.find(
      (variantValue) => variantValue.variantTypeName === "Renk"
    );

    const sizeVariant = item.variant.variantValues?.find(
      (variantValue) => variantValue.variantTypeName === "Beden"
    );
    return (
      <div className="w-full flex flex-col gap-2">
        <h2 className="text-[#222] text-[27px] md:text-lg xs:text-base leading-none">
          {item.variant.name}
        </h2>
        <h2 className="text-[20px] text-[#222] md:text-xs">
          {item.formattedFinalPrice}
        </h2>
        {colorVariant && (
          <div className="flex items-center gap-2 font-light">
            <span className="font-normal">Renk:</span>
            {colorVariant?.variantValueName}
          </div>
        )}
        {sizeVariant && (
          <div className="flex items-center gap-2 font-light">
            <span className="font-normal">Beden:</span>
            {sizeVariant?.variantValueName}
          </div>
        )}
        <ItemOptions
          item={item}
          currencyCode={store.cartStore.cart!.currencyCode || ""}
          currencySymbol={store.cartStore.cart!.currencySymbol || ""}
        />
      </div>
    );
  }
);

const ItemQuantityColumn = observer(
  ({ item, store }: { item: IkasOrderLineItem; store: IkasBaseStore }) => {
    const handleQuantityChange = async (value: number) => {
      const result = await store.cartStore.changeItemQuantity(item, value);
      if (result.response?.graphQLErrors) {
        maxQuantityPerCartHandler({
          productName: item.variant.name,
          errors: result.response?.graphQLErrors,
        });
      }
    };
    return (
      <div>
        <QuantityButton
          lightBackground
          isFullWidth
          quantity={item.quantity}
          onChange={handleQuantityChange}
        />
      </div>
    );
  }
);

const ItemPriceColumn = observer(({ item }: { item: IkasOrderLineItem }) => {
  return (
    <div className="xs:w-full">
      {item.discountPrice !== null && (
        <div className="text-base line-through">
          {item.formattedPriceWithQuantity}
        </div>
      )}
      <span className="text-[24px] md:text-base">
        {item.formattedFinalPriceWithQuantity}
      </span>
    </div>
  );
});

const ItemRemoveColumn = observer(
  ({ item, store }: { item: IkasOrderLineItem; store: IkasBaseStore }) => {
    return (
      <button onClick={() => store.cartStore.removeItem(item)}>
        <RemoveSVG />
      </button>
    );
  }
);

const ItemImage = observer(({ item }: { item: IkasOrderLineItem }) => {
  return (
    <picture className="w-[160px] h-[270px] relative">
      <Link passHref href={item.variant.href || ""}>
        <a className="relative w-full h-full block">
          {!item.variant.mainImage?.id ? (
            <ProductImagePlaceholder />
          ) : (
            <Image
              image={item.variant.mainImage}
              layout="fill"
              sizes="200px"
              className="object-cover object-center"
            />
          )}
        </a>
      </Link>
    </picture>
  );
});ItemImage

type ItemOptionsProps = {
  item: IkasOrderLineItem;
  currencyCode: string;
  currencySymbol: string;
};

const formatOptionPrice = (
  price: number,
  currencyCode: string,
  currencySymbol: string
) => formatCurrency(price, currencyCode, currencySymbol);

const ItemOptions = observer(
  ({ item, currencyCode, currencySymbol }: ItemOptionsProps) => {
    const OptionValue = ({
      option,
      value,
    }: {
      option: IkasOrderLineItemOption;
      value: IkasOrderLineItemOptionValue;
    }) => {
      const price = value.price
        ? `+ ${formatOptionPrice(value.price, currencyCode, currencySymbol)}`
        : "";
      const OptionMeta = () => {
        return (
          <span>
            {option.name} {price}
          </span>
        );
      };
      switch (option.type) {
        case IkasProductOptionType.TEXT:
          return (
            <div>
              <OptionMeta /> - {value.value}
            </div>
          );
        case IkasProductOptionType.TEXT_AREA:
          return (
            <div>
              <OptionMeta /> - {value.value}
            </div>
          );
        case IkasProductOptionType.CHECKBOX:
          return (
            <div>
              <OptionMeta />
            </div>
          );
        case IkasProductOptionType.CHOICE:
          return (
            <div>
              <OptionMeta /> - {value.name}
            </div>
          );
        case IkasProductOptionType.COLOR_PICKER:
          return (
            <div>
              <OptionMeta />
              {" - "}
              <Swatch
                title={value.name || ""}
                colorCode={value.value}
                selected={false}
                onClick={() => {}}
              />
            </div>
          );
        case IkasProductOptionType.FILE:
          return (
            <div>
              <OptionMeta />
              {" - "}
              <S.OptionFileDownloadButton
                onClick={async () => await value.downloadFile()}
              >
                <span>
                  <AiOutlineCloudDownloadSVG />
                </span>
                <span>{value.fileName}</span>
              </S.OptionFileDownloadButton>
            </div>
          );
        default:
          return null;
      }
    };

    if (!item.options || !item.options?.length) return null;
    return (
      <S.ItemOptions>
        {item.options.map((option, index) => (
          <div key={index}>
            {option.values.map((value, valueIndex) => (
              <OptionValue key={valueIndex} option={option} value={value} />
            ))}
          </div>
        ))}
      </S.ItemOptions>
    );
  }
);
