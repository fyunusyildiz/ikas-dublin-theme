import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";
import { theme } from "src/styles/styled";

export const ProductColumn = styled.div`
  grid-column: span 6 / span 6;

  @media screen and (max-width: ${breakpoints.sm}) {
    grid-column: span 9 / span 9;
    margin-bottom: 20px;
  }
`;
export const QuantityColumn = styled.div`
  grid-column: span 3 / span 3;
  @media screen and (max-width: ${breakpoints.sm}) {
    order: 2;
    grid-column: span 12 / span 12;
    text-align: center;
  }
`;

export const PriceColumn = styled.div`
  grid-column: span 2 / span 2;
  @media screen and (max-width: ${breakpoints.sm}) {
    order: 1;
    grid-column: span 2 / span 2;
  }
`;

export const RemoveColumn = styled.div`
  grid-column: span 1 / span 1;
  @media screen and (max-width: ${breakpoints.sm}) {
    order: 1;
    grid-column: span 1 / span 1;
  }
`;

// SUMMARY
export const SummaryBox = styled.div`
  padding: 24px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);
  border-radius: 12px;
`;

export const BoxTitle = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 24px;
`;

export const SummaryBoxInner = styled.div``;
export const SummaryBoxText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 8px;
  color: ${theme.color.secondaryText};
`;
export const TotalFinalPrice = styled(SummaryBoxText)`
  border-top: 1px solid ${theme.color.border};
  padding-top: 8px;
  color: ${theme.color.primaryText};
  font-weight: 500;
  margin-top: 8px;
`;

export const SummaryButtonWrapper = styled.div`
  margin-top: 24px;
  > *:first-child {
    margin-bottom: 12px;
  }
`;

export const SummaryFreeShippingText = styled.div`
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
  margin-top: 18px;
  text-align: center;

  span {
    display: inline-block;
    vertical-align: middle;
  }
  span:first-child {
    margin-right: 8px;
  }
`;

export const Coupon = styled.div`
  margin-top: 20px;
`;

export const REMOVE_COUPON_BUTTON_WIDTH = 30;
export const RemoveCouponButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.color.red};
  width: ${REMOVE_COUPON_BUTTON_WIDTH}px;
  height: calc(100% - 2px);
  right: 1px;
  :hover,
  :focus {
    color: ${theme.color.white};
    background-color: ${theme.color.red};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.inputBorderRadius};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;
