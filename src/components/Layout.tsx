import { device } from "src/styles/theme";
import styled from "styled-components";
import { P } from "src/components/Typography";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0;
  width: 100%;

  @media ${device.laptop} {
    grid-template-columns: ${({ theme }) => theme.grid.sidebar} 1fr;
  }
`;

export const Container = styled.div`
  padding: ${({ theme }) => theme.padding.mobile};
  width: 100%;

  @media ${device.tablet} {
    padding: ${({ theme }) => theme.padding.desktop};
  }
`;

export const Content = styled(Container)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  height: 100%;
`;

export const Sidebar = styled(Container)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
`;

export const Footer = styled.footer`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  z-index: 1;

  ${P} {
    max-width: 70ch;
  }
`;
