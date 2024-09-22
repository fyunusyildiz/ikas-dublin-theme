import styled from "styled-components";
import { FORM_ITEM_MARGIN_BOTTOM } from "../form/form-item/style";
import { theme } from "src/styles/styled";

export const TextWrapper = styled.div`
  color: ${theme.color.black};
  margin-bottom: ${FORM_ITEM_MARGIN_BOTTOM}px;
`;

export const Link = styled.a`
  text-decoration: underline;
  font-weight: 500;

  :hover {
    color: ${theme.color.primaryText};
  }
`;
