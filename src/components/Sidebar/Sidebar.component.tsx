import React, { FC } from "react";
import { device } from "src/styles/theme";
import styled from "styled-components";
import { Container } from "src/components/Layout";

export const SidebarWrapper = styled(Container)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;

  @media ${device.laptop} {
    width: ${({ theme }) => theme.grid.sidebar};
  }
`;

export const Sidebar: FC = ({ children }) => (
  <SidebarWrapper data-testid="scSidebar">{children}</SidebarWrapper>
);

export default Sidebar;
