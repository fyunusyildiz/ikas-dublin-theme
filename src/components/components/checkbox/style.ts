import styled, { css } from "styled-components";
import { FormItemStatus } from "../form/form-item";

type WrapperProps = {
  $status: FormItemStatus;
};

export const Wrapper = styled.label<WrapperProps>`
  position: relative;
  display: flex;
  align-items: center;

  ${({ $status }) =>
    $status === "error" &&
    css`
      color: #ff0000;
    `};
`;

export const CustomCheckboxInnerWrapper = styled.span<{ $mr: boolean }>`
  position: relative;
  display: inline-block;
  color: #222;
  ${({ $mr }) => $mr && `margin-right: 8px;`}
`;

type CustomCheckboxProps = {
  $status: FormItemStatus;
};

export const CustomCheckbox = styled.span<CustomCheckboxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  padding: 2px;
  color: #222;
  border: 1px solid #222;
  background-color: #f4f4f4;

  ${({ $status }) =>
    $status === "error" &&
    css`
      color: #ff0000;
      border-color: #ff0000;
    `};

  border-radius: 2px;
  cursor: pointer;
`;

export const HiddenCheckbox = styled.input`
  :hover + span,
  :focus-within + span {
    box-shadow: 0 0 0 2px rgb(0 0 0 / 10%);
    border-radius: 2px;
  }
`;
