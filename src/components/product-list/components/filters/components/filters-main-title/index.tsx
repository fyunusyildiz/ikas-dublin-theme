import React from "react";
import { observer } from "mobx-react-lite";
import { IkasProductList, useTranslation } from "@ikas/storefront";

import { useTotalAppliedFiltersCount } from "./useTotalAppliedFiltersCount";

import * as S from "./style";

type Props = {
  productList: IkasProductList;
};

export const FiltersMainTitle = observer(({ productList }: Props) => {
  const { t } = useTranslation();
  const appliedCount = useTotalAppliedFiltersCount(productList);

  return (
    <S.TitleWrapper>
      <S.FiltersTitle>
        {"Filtreler"} ({appliedCount})
      </S.FiltersTitle>
      <S.ClearFiltersButton
        onClick={() => {
          productList.clearFilters();
        }}
      >
        Temizle
      </S.ClearFiltersButton>
    </S.TitleWrapper>
  );
});
