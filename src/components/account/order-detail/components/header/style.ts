import styled from "styled-components";
import { theme } from "src/styles/styled";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid ${theme.color.border};
  padding-bottom: 16px;
  margin-bottom: 32px;
`;

export const OrderNoDetail = styled.div`
  font-weight: 500;
`;

export const OrderedAt = styled.div``;
