import styled from "styled-components";
import { theme } from "src/styles/styled";

export const RefundStatus = styled.div`
  margin-top: 8px;
  font-size: ${theme.fontSize.sm};
  color: ${theme.color.secondaryText};
`;

export type RefundStatusTextColor = "orange" | "green" | "red" | "blue";
type RefundStatusText = { $color: RefundStatusTextColor };

export const RefundStatusText = styled.span<RefundStatusText>`
  color: ${({ $color }) => theme.color[$color]};
`;
