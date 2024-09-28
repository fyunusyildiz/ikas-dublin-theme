import styled, { css } from "styled-components";
import { ButtonSize, ButtonType } from ".";
import { theme } from "src/styles/styled";

type ButtonProps = {
  $block?: boolean;
  $size: ButtonSize;
  $buttonType: ButtonType;
};

export const ButtonSizes: Record<ButtonSize, number> = {
  small: 38,
  middle: 45,
  large: 52,
};

export const Button = styled.button<ButtonProps>`
  text-align: center;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({ $buttonType }) => {
    if ($buttonType === "primary") {
      return css`
        color: ${theme.color.button};
        background-color: ${theme.color.buttonBg};
        border: 1px solid ${theme.color.buttonBg};
      `;
    }

    return css`
      color: ${theme.color.secondaryButton};
      background-color: ${theme.color.secondaryButtonBg};
      border: 1px solid ${theme.color.secondaryButton};
      transition-property: color, background-color, border;
      transition-timing-function: ease-in-out;
      transition-duration: 300ms;

      :hover,
      :focus {
        color: ${theme.color.secondaryButtonBg};
        background-color: ${theme.color.secondaryButton};
        border: 1px solid ${theme.color.secondaryButtonBg};
      }
    `;
  }}

  ${({ $size }) => {
    if ($size === "small") {
      return css`
        font-size: 12px;
        line-height: 20px;
        height: ${ButtonSizes.small}px;
        padding: 0 14px;
      `;
    }

    if ($size === "middle") {
      return css`
        font-size: 16px;
        line-height: 28px;
        height: ${ButtonSizes.middle}px;
        padding: 0 24px;
      `;
    }

    if ($size === "large") {
      return css`
        font-size: 16px;
        line-height: 30px;
        height: 54px;
        padding: 0;
        background-color: #222;
        margin-top: 20px;
        color: #fff;
      `;
    }
  }}

  ${({ $block }) => $block && `width: 100%;`};

  :hover,
  :focus {
    opacity: 0.9;
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;


export const Loading = styled.span`
  display: inline-block;
  margin-right: 8px;
`;
