import styled, { css } from "styled-components";

export const BoxWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
`;

type Props = {
  $selected: boolean;
  $disabled?: boolean;
};

export const Box = styled.button<Props>`
  grid-column: span 1 / span 1;
  padding: 4px 12px;
  font-weight: 300;
  font-size: 12px;
  line-height: 24px;
  background: #ffffff;
  border: 1px solid #dfe2e6;

  ${({ $selected }) =>
    $selected &&
    css`
      background: #ffffff;
      border: 1px solid #22252a;
    `};

  ${({ $disabled }) =>
    $disabled &&
    css`
      color: #dfe2e6;
      background: #fafafa;
      border: 1px solid #dfe2e6;
    `};
`;
