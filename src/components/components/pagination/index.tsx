import React from "react";
import { useTranslation } from "@ikas/storefront";

import * as S from "./style";

type Props = {
  hasPrev: boolean;
  hasNext: boolean;
  loading: boolean;
  count: number;
  page: number;
  pageCount: number;
  getPage: (page: number) => Promise<void>;
};

const Pagination = (props: Props) => {
  const { t } = useTranslation();
  const { hasPrev, hasNext, loading, count, page, pageCount } = props;

  const prevButtonDisabled = loading || !hasPrev;
  const nextButtonDisabled = loading || !hasNext;

  const getPage = async (page: number) => {
    if (loading) return;
    await props.getPage(page);
  };

  const onPreviousClick = () => {
    if (!hasPrev) return;
    getPage(page - 1);
  };

  const onNextClick = () => {
    if (!hasNext) return;
    getPage(page + 1);
  };

  if (!count) return null;
  return (
    <footer className="w-full my-10 flex items-center justify-center gap-5">
      <S.PrevButton
        disabled={prevButtonDisabled}
        title={t("pagination.previousPage")}
        onClick={onPreviousClick}
      >
        Önceki
      </S.PrevButton>
      <div>
        {page} / {pageCount}
      </div>
      <S.NextButton
        disabled={nextButtonDisabled}
        title={t("pagination.nextPage")}
        onClick={onNextClick}
      >
        Sonraki
      </S.NextButton>
    </footer>
  );
};

export default Pagination;
