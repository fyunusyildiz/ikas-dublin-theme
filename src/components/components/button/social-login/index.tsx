import React from "react";

import * as S from "./style";

type Props = {
  color: string;
  bgColor: string;
  borderColor: string;
  subText: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const SocialLoginButton = (props: Props) => {
  const {
    color,
    bgColor,
    borderColor,
    subText,
    icon,
    onClick,
  } = props;

  return (
    <S.Button
      type="button"
      $bgColor={bgColor}
      $color={color}
      $borderColor={borderColor}
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
      className="col-span-1 xs:col-span-2"
    >
      <S.Icon>{icon}</S.Icon>
      <S.Content>
        <S.SubText>{subText}</S.SubText>
      </S.Content>
    </S.Button>
  );
};

export default SocialLoginButton;
