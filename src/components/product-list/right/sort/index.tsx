import React from "react";
import { observer } from "mobx-react-lite";
import {
  IkasProductList,
  IkasProductListSortType,
  useTranslation,
} from "@ikas/storefront";

import Loading from "src/components/svg/loading";
import ChevronDownSVG from "src/components/svg/chevron-down";

import * as S from "./style";

type Props = {
  productList: IkasProductList;
};

const Sorting: React.FC<Props> = (props: Props) => {
  return (
    <S.Sort>
      <Label />
      <SortSelect {...props} />
    </S.Sort>
  );
};

export default observer(Sorting);

const SortSelect = observer(({ productList }: Props) => {
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (productList.isLoading) return;
    productList.setSortType(e.target.value as IkasProductListSortType);
  };

  const enabledOptions = options.filter((option) => {
    const isFeaturedSort = option.value === IkasProductListSortType.FEATURED;
    const isFeaturedSortEnabled =
      isFeaturedSort && !productList.isFeaturedSortEnabled;

    return isFeaturedSort ? isFeaturedSortEnabled : true;
  });

  return (
    <S.SelectWrapper>
      <S.Select
        id="product-list-sort-select"
        name="product-list-sort-select"
        value={productList.sort}
        onChange={onSelectChange}
      >
        {enabledOptions.map((option) => (
          <Option key={option.value} option={option} />
        ))}
      </S.Select>
      <S.SelectIcon>
        {productList.isLoading ? <Loading /> : <ChevronDownSVG />}
      </S.SelectIcon>
    </S.SelectWrapper>
  );
});

const Option = observer(({ option }: { option: Option }) => {
  const { t } = useTranslation();
  return (
    <S.Option value={option.value}>
      {`${option.labelKey}`}
    </S.Option>
  );
});

const Label = () => {
  const { t } = useTranslation();

  return (
    <S.Label htmlFor="product-list-sort-select">
      Sırala:
    </S.Label>
  );
};

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
