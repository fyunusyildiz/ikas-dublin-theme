import { theme } from "src/styles/styled";
import styled from "styled-components";

export const ResponseStatus = styled.p<{ $status: "error" | "success" }>`
  color: ${({ $status }) =>
    $status === "error" ? theme.color.red : theme.color.green};
`;

export const Title = styled.p`
  margin-bottom: 8px;
`;

export const Text = styled.p`
  color: ${theme.color.secondaryText};
  font-size: ${theme.fontSize.sm};
  margin-bottom: 8px;
`;
