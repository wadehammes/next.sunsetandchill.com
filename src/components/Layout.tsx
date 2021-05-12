import { device } from "src/styles/theme";
import styled from "styled-components";

interface GridProps {
  gridHeight: string;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0;
  width: 100%;
  height: ${({ gridHeight }) => gridHeight ?? "100vh"};

  @media ${device.tablet} {
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
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${({ theme }) => theme.padding.mobile};
  height: 100%;
  text-align: center;

  @media ${device.tablet} {
    padding-left: 0;
    grid-gap: ${({ theme }) => theme.padding.desktop};
  }
`;
