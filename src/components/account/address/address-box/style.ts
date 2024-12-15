import styled from "styled-components";
import { theme } from "src/styles/styled";

export const AddressBox = styled.li`
  display: flex;
  flex-direction: column;
  border: 1px solid #222;
  padding: 16px;
`;

export const Title = styled.p`
  font-weight: 500;
  margin-bottom: 8px;
  flex-grow: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

export const AddressText = styled.p`
  flex-grow: 1;
  color: #222;
`;

export const ButtonsWrapper = styled.footer`
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  gap: 10px;
`;

export const Button = styled.button`
  font-size: 14px;
  line-height: 30px;
  height: 40px;
  padding: 0;
  background-color: #222;
  color: #fff;
  width: 100%;
`;
