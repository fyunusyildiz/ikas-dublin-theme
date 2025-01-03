import React from "react";
import { FormItemStatus } from "../form/form-item/";
import * as S from "./style";

export type Props = {
  prefix?: string;
  status?: FormItemStatus;
  wrapperClassName?: string;
} & Omit<JSX.IntrinsicElements["input"], "prefix">;

const Input = (props: Props) => {
  const { status, ref, prefix, ...restProps } = props;

  return (
    <div className={`${props.wrapperClassName} relative`}>
      {!!prefix && <S.Prefix>{prefix}</S.Prefix>}
      <S.Input $hasPrefix={!!prefix} $status={status} {...restProps} />
      {!!restProps.maxLength && typeof restProps.value === "string" && (
        <S.Length>
          {restProps.value?.length || "0"} / {restProps.maxLength}
        </S.Length>
      )}
    </div>
  );
};

export default Input;

type DatePickerProps = {
  status: FormItemStatus;
} & JSX.IntrinsicElements["input"];

export const DatePicker = ({
  ref,
  status,
  type,
  ...restProps
}: DatePickerProps) => {
  return <S.DatePicker $status={status} type="date" {...restProps} />;
};
