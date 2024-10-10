import { IkasProductList } from "@ikas/storefront";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import Sort from "../sort";

import { Filters } from "../../components/filters/index/index";

import { useTotalAppliedFiltersCount } from "../../components/filters/components/filters-main-title/useTotalAppliedFiltersCount";

type HeaderProps = {
  productList: IkasProductList;
};

export const Header = observer((props: HeaderProps) => {
  const { productList } = props;
  const [activeModal, setModal] = useState<"sort" | "filter" | null>(null);
  const appliedCount = useTotalAppliedFiltersCount(productList);

  const onModalClose = () => {
    setModal(null);
  };

  return (
    <header className="w-full flex justify-end items-center bg-[#d9d9d9] relative z-50">
      <div className="flex items-center gap-[14px] w-fit pr-[30px] xs:px-5 xs:justify-between xs:w-full">
        <button
          className="flex items-center justify-center text-[12px] gap-2 py-[3px] text-[#222222]"
          onClick={
            activeModal === "filter" ? onModalClose : () => setModal("filter")
          }
        >
          {activeModal === "filter" ? "KAPAT" : `FİLTRELE (${appliedCount})`}
        </button>
        <button
          className="flex items-center justify-center gap-3 text-[12px] py-[3px] text-[#222222]"
          onClick={() => {
            activeModal === "sort" ? onModalClose() : setModal("sort");
          }}
        >
          {activeModal === "sort" ? "KAPAT" : "SIRALA"}
        </button>
        {appliedCount > 0 && activeModal != "filter" && (
          <div className="w-full bg-white absolute top-[24px] left-0 p-5 header-sm:p-2 border-y border-solid flex items-center flex-wrap header-sm:flex-nowrap overflow-x-auto gap-3 header-sm:gap-1 border-[#222]">
            {productList.filters?.map((filter) =>
              filter.displayedValues.map(
                (value) =>
                  value.isSelected && (
                    <button
                      className="flex min-w-[150px] header-sm:min-w-[110px] gap-5 text-2xs header-sm:text-[12px] justify-between items-center px-3 py-2 header-sm:p-1 border border-solid border-[#d9d9d9]"
                      onClick={() => filter.onFilterValueClick(value)}
                    >
                      {value.name}
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
                  )
              )
            )}
          </div>
        )}
        {activeModal === "filter" && (
          <FilterModal
            productList={productList}
            onClose={onModalClose}
            visible
          />
        )}
        {activeModal === "sort" && (
          <SortModal productList={productList} onClose={onModalClose} visible />
        )}
      </div>
    </header>
  );
});

type FilterModalProps = {
  productList: IkasProductList;
  onClose: () => void;
  visible: boolean;
};

const FilterModal = ({ productList, onClose, visible }: FilterModalProps) => {
  return (
    <div
      className={`w-full ${
        visible ? "flex" : "hidden"
      } absolute top-[24px] left-0 bg-transparent h-[calc(100vh-105px)] header-sm:h-[calc(100vh-85px)]`}
      onClick={onClose}
    >
      <div
        className={`w-full bg-white h-[530px] sm:h-full overflow-y-auto border-y border-solid border-[#222] overflow-hidden grid grid-cols-4`}
        onClick={(e) => e.stopPropagation()}
      >
        <Filters productList={productList} />
      </div>
    </div>
  );
};

type SortModalProps = {
  productList: IkasProductList;
  onClose: () => void;
  visible: boolean;
};

const SortModal = ({ productList, onClose, visible }: SortModalProps) => {
  return (
    <div
      className={`w-full ${
        visible ? "flex" : "hidden"
      } absolute top-[24px] left-0 bg-transparent h-[calc(100vh-105px)] flex justify-end`}
      onClick={onClose}
    >
      <div
        className={`w-[260px] bg-white h-fit border border-solid border-[#222] overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <Sort productList={productList} />
      </div>
    </div>
  );
};
