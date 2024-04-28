import styled from "styled-components";

export const Thumbnail = styled.button<{ $selected: boolean }>`
  display: block;
  flex-shrink: 0;
  width: 100px;

  border-width: 1px;
  border-style: solid;

  ${({ $selected }) => `border-color: ${$selected ? "black" : "transparent"};`}

  @media (min-width: 1440px) {
    display: block;
    margin-bottom: 24px;
    :last-child {
      margin-bottom: 0;
    }
  }
`;

export const MainImage = styled.figure`
  position: relative;
  height: 100%;

  @media (min-width: 1440px) {
    width: calc(100% - 124px);
    margin-left: 124px;
  }
`;
