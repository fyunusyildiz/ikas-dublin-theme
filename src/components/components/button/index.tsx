import { Link } from "@ikas/storefront";
import React from "react";

import LoadingSVG from "src/components/svg/loading";

import * as S from "./style";

export type ButtonSize = "large" | "middle" | "small";
export type ButtonType = "primary" | "default";

interface ButtonProps {
  buttonType?: ButtonType /** * Default default */;
  size?: ButtonSize /** * Default middle */;
  stopPropagation?: boolean;
  anchor?: boolean;
  href?: string;
  type?: JSX.IntrinsicElements["button"]["type"];
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
}

function Button(props: ButtonProps) {
  const onClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    if (props.stopPropagation) event.stopPropagation();
    props.onClick && props.onClick(event);
  };

  return (
    <S.Button
      type={props.type}
      $buttonType={props.buttonType || "primary"}
      title={props.title}
      disabled={props.disabled}
      $block={!!props.block}
      $size={props.size || "middle"}
      onClick={onClick}
      className={props.className}
    >
      {props.loading && <Loading />}
      {props.children}
    </S.Button>
  );
}

export default Button;

export const Loading = () => (
  <S.Loading>
    <LoadingSVG />
  </S.Loading>
);
