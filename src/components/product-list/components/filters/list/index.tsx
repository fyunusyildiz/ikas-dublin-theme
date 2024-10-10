import { IkasApplicableProductFilterValue } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import { useState } from "react";
import { FiltersWrapper } from "../components/filters-wrapper";
import { FiltersProps } from "../index/index";

export const ListFilters = observer(({ filter }: FiltersProps) => {
  if (!filter.displayedValues || !filter.displayedValues.length) return null;
  return (
    <FiltersWrapper settings={filter.settings} title={filter.name}>
      <div className="w-full grid grid-cols-2 gap-3">
        {filter.displayedValues.map((value) => (
          <ListFilter
            selected={value.isSelected}
            key={value.id}
            value={value}
            onClick={(value) => filter.onFilterValueClick(value)}
          />
        ))}
      </div>
    </FiltersWrapper>
  );
});

type ListFilterProps = {
  value: IkasApplicableProductFilterValue;
  onClick: (value: IkasApplicableProductFilterValue) => void;
  selected: boolean;
};

const ListFilter = ({ value, onClick, selected }: ListFilterProps) => {
  return (
    <>
      <button
        className={`col-span-1 flex items-center justify-between p-3 border border-solid ${
          selected ? "border-[#222] font-normal" : "border-[#d9d9d9] font-light"
        } text-[#222] text-[12px]`}
        onClick={() => {
          onClick(value);
        }}
      >
        <div className="flex items-center">{value.name}</div>
        {selected && (
          <button
            onClick={() => {
              onClick(value);
            }}
          >
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
          </button>
        )}
      </button>
    </>
  );
};

export default observer(ListFilter);
