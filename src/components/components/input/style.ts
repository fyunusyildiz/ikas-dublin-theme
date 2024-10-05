import styled, { css } from "styled-components";
import { FormItemStatus } from "../form/form-item";
import { theme } from "src/styles/styled";

export const InputWrapper = styled.div`
  position: relative;
`;

export const Prefix = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 8px;
  border-right: 1px solid ${theme.color.inputBorder};
  padding-right: 4px;
  height: 100%;
  display: flex;
  align-items: center;
`;

type StyledInputProps = {
  $hasPrefix: boolean;
} & StatusProps;

type StatusProps = {
  $status: FormItemStatus;
};

export const Input = styled.input<StyledInputProps>`
  width: 100%;
  height: 42px;
  outline: none !important;
  ${({ $hasPrefix }) => {
    if ($hasPrefix) {
      return `padding: 0 8px 0 30px;`;
    }
    return `padding: 0 8px;`;
  }}

  background-color: ${({ $status }) => {
    if ($status === "error") {
      return theme.color.red + "25";
    }
    return "#f8f8f8";
  }};

  border: 1px solid
    ${({ $status }) => {
      if ($status === "error") {
        return "#f00000";
      }

      return "#222";
    }};

      color: ${theme.color.inputText};
      font-size: ${theme.fontSize.sm};
      border-radius: 0;

  :disabled {
    color: #dadada;
    background-color: #fafafa;
    cursor: not-allowed;
  }
`;

export const Length = styled.div`
  margin-top: 4px;
  ${({ theme }) => css`
    font-size: ${theme.fontSize.sm};
    color: ${theme.color.secondaryText};
    text-align: right;
  `}
`;

export const DatePicker = styled.input<StatusProps>`
  padding: 0 8px;
  font-size: ${theme.fontSize.sm};
  border-radius: ${theme.inputBorderRadius};

  width: 100%;
  height: 42px;

  background-color: ${({ $status }) => {
    if ($status === "error") {
      return theme.color.red + "25";
    }
    return theme.color.inputBackground;
  }};

  border: 1px solid
    ${({ $status }) => {
      if ($status === "error") {
        return theme.color.red;
      }

      return theme.color.inputBorder;
    }};

  :disabled {
    background-color: ${theme.color.inputBorder};
  }
`;
