import styled from "styled-components";
import { FormItemStatus } from "../form/form-item";
import { theme } from "src/styles/styled";

type StyledSelectProps = {
  $status: FormItemStatus;
};

export const Select = styled.select<StyledSelectProps>`
  width: 100%;
  height: 42px;
  outline: none !important;

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
