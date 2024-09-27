import { IkasProductList, useTranslation } from "@ikas/storefront";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import { useScreen } from "src/utils/hooks/useScreen";
import Sort from "../sort";

import Modal from "src/components/components/modal";
import { Categories } from "../../components/categories";
import { FiltersMainTitle } from "../../components/filters/components/filters-main-title";
import { Filters } from "../../components/filters/index/index";

import { FilterSVG } from "../svg/filter";
import { SortSVG } from "../svg/sort";

import * as S from "./style";

type HeaderProps = {
  productList: IkasProductList;
};

export const Header = observer((props: HeaderProps) => {
  const { productList } = props;
  const { isMobile } = useScreen();
  const [activeModal, setModal] = useState<"sort" | "filter" | null>(null);

  const onModalClose = () => {
    setModal(null);
  };

  if (isMobile) return <MobileHeader {...props} />;
  return (
    <header className="w-full flex justify-end items-center bg-[#d9d9d9]">
      <div className="flex items-center gap-[14px] w-fit pr-[30px]">
        <button
          className="flex items-center justify-center text-[12px] gap-2 py-[3px] text-[#222222]"
          onClick={() => setModal("filter")}
        >
          FİLTRELE
        </button>
        <button
          className="flex items-center justify-center gap-3 text-[12px] py-[3px] text-[#222222]"
          onClick={() => setModal("sort")}
        >
         SIRALA
        </button>
        {activeModal === "filter" && (
          <FilterModal productList={productList} onClose={onModalClose} />
        )}
        {activeModal === "sort" && (
          <SortModal productList={productList} onClose={onModalClose} />
        )}
      </div>
    </header>
  );
});

const MobileHeader = observer(({ productList }: HeaderProps) => {
  const { t } = useTranslation();
  const [activeModal, setModal] = useState<"sort" | "filter" | null>(null);
  const totalProductCount = `Toplam: ${productList.data.length}`;

  const onModalClose = () => {
    setModal(null);
  };
  return (
    <S.MobileHeader>
      <p className="w-full px-2 mb-2 text-2xs">{totalProductCount}</p>
      <div className="flex w-full items-stretch bg-gray-one border-b border-t border-solid border-gray-two">
        <S.MobileHeaderButton onClick={() => setModal("filter")}>
          <FilterSVG /> Filtrele
        </S.MobileHeaderButton>
        <div className="w-[1px] bg-gray-two block" />
        <S.MobileHeaderButton onClick={() => setModal("sort")}>
          Sırala <SortSVG />
        </S.MobileHeaderButton>
      </div>
      {activeModal === "filter" && (
        <FilterModal productList={productList} onClose={onModalClose} />
      )}
      {activeModal === "sort" && (
        <SortModal productList={productList} onClose={onModalClose} />
      )}
    </S.MobileHeader>
  );
});

type FilterModalProps = {
  productList: IkasProductList;
  onClose: () => void;
};

const FilterModal = ({ productList, onClose }: FilterModalProps) => {
  return (
    <Modal visible={true} onClose={onClose}>
      <FiltersMainTitle productList={productList} />
      <Categories productList={productList} />
      <Filters productList={productList} />
    </Modal>
  );
};

type SortModalProps = {
  productList: IkasProductList;
  onClose: () => void;
};

const SortModal = ({ productList, onClose }: SortModalProps) => {
  return (
    <Modal visible={true} onClose={onClose}>
      <Sort productList={productList} />
    </Modal>
  );
};
