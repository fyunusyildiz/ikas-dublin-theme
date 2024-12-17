import styled, { css } from "styled-components";
import { FormItemStatus } from "../form/form-item";
import { theme } from "src/styles/styled";

type StyledTextareaProps = {
  $status: FormItemStatus;
};

export const Textarea = styled.textarea<StyledTextareaProps>`
  padding: 8px;
  min-height: 100px;
  resize: vertical;
  width: 100%;
  outline: none !important;

  background-color: ${({ $status }) => {
    if ($status === "error") {
      return theme.color.red + "25";
    }
    return "#f8f8f8";
  }};

  color: ${theme.color.inputText};
  font-size: ${theme.fontSize.sm};

  border: 1px solid
    ${({ $status }) => {
      if ($status === "error") {
        return "#f00000";
      }

      return "#222";
    }};

  color: ${theme.color.inputText};
`;

export const Length = styled.div`
  margin-top: 4px;
  font-size: ${theme.fontSize.sm};
  color: ${theme.color.secondaryText};
  text-align: right;
`;
