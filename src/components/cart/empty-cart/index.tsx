import React from "react";
import { Link, useTranslation } from "@ikas/storefront";

import Button from "src/components/components/button";

import * as S from "./style";

const EmptyCart = () => {
  const { t } = useTranslation();
  return (
    <S.EmptyCart>
      <S.Text>
        Sepetiniz şu anda boş!
      </S.Text>
      <Link href="/">
        Alışverişe Başla
      </Link>
    </S.EmptyCart>
  );
};

export default EmptyCart;
