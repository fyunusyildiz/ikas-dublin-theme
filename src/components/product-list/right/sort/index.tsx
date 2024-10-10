import { IkasProductList, IkasProductListSortType } from "@ikas/storefront";
import { observer } from "mobx-react-lite";
import React from "react";

type Props = {
  productList: IkasProductList;
};

const Sorting: React.FC<Props> = (props: Props) => {
  const enabledOptions = options.filter((option) => {
    const isFeaturedSort = option.value === IkasProductListSortType.FEATURED;
    const isFeaturedSortEnabled =
      isFeaturedSort && !props.productList.isFeaturedSortEnabled;

    return isFeaturedSort ? isFeaturedSortEnabled : true;
  });
  return (
    <div className="flex flex-col p-3 gap-3">
      {enabledOptions.map((option) => (
        <button
          className={`w-full border border-solid text-[12px] uppercase ${
            props.productList.sort === option.value
              ? "border-[#222]"
              : "border-[#d9d9d9]"
          } text-[#222] p-3`}
          onClick={() =>
            props.productList.setSortType(
              option.value as IkasProductListSortType
            )
          }
        >
          {`${option.labelKey}`}
        </button>
      ))}
    </div>
  );
};

export default observer(Sorting);

type Option = {
  value: string;
  labelKey: string;
};

const options: Option[] = [
  {
    value: IkasProductListSortType.FEATURED,
    labelKey: "Öne Çıkanlar",
  },
  {
    labelKey: "Artan Fiyat",
    value: IkasProductListSortType.INCREASING_PRICE,
  },
  {
    labelKey: "Azalan Fiyat",
    value: IkasProductListSortType.DECREASING_PRICE,
  },
  {
    labelKey: "Artan İndirim",
    value: IkasProductListSortType.INCREASING_DISCOUNT,
  },
  {
    labelKey: "Azalan İndirim",
    value: IkasProductListSortType.DECRASING_DISCOUNT,
  },
  {
    labelKey: "İlk Eklenen",
    value: IkasProductListSortType.FIRST_ADDED,
  },
  {
    labelKey: "Son Eklenen",
    value: IkasProductListSortType.LAST_ADDED,
  },
];
