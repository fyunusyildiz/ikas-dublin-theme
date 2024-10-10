import { IkasApplicableProductFilterValue } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import { FiltersWrapper } from "src/components/product-list/components/filters/components/filters-wrapper";

import { FiltersProps } from "../index/index";
import * as S from "./style";
import { useState } from "react";

export const BoxFilters = observer((props: FiltersProps) => {
  const { filter, lastChild } = props;
  if (!filter.displayedValues || !filter.displayedValues.length) return null;
  return (
    <FiltersWrapper settings={filter.settings} title={filter.name}>
      <S.BoxWrapper>
        {props.filter.displayedValues.map((value) => (
          <BoxFilter
            key={value.id}
            value={value}
            selected={value.isSelected}
            onClick={(value) => {
              props.filter.onFilterValueClick(value);
            }}
          />
        ))}
      </S.BoxWrapper>
    </FiltersWrapper>
  );
});

type BoxFilterProps = {
  value: IkasApplicableProductFilterValue;
  onClick: (value: IkasApplicableProductFilterValue) => void;
  selected: boolean;
};

const BoxFilter = ({ value, onClick, selected }: BoxFilterProps) => {
  return (
    <button
      className={`col-span-1 flex items-center justify-between p-3 border border-solid ${
        selected
          ? "border-[#222] font-normal"
          : "border-[#d9d9d9] font-light"
      } text-[#222] text-[12px]`}
      onClick={() => {
        onClick(value);
      }}
    >
      {value.name}
      {selected && (
        <div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#1E1E1E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </button>
  );
};

export default observer(BoxFilter);
