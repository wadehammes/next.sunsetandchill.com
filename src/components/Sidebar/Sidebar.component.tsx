import React, { FC } from "react";
import Link from "next/link";
import { device } from "src/styles/theme";
import styled from "styled-components";
import { Container } from "src/components/Layout";
import { Logo } from "src/components/Logo";

export const SidebarWrapper = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: column nowrap;
  text-align: center;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;

  @media ${device.laptop} {
    width: ${({ theme }) => theme.grid.sidebar};
  }
`;

export const Sidebar: FC = () => (
  <div data-testid="scGridSidebarColumn">
    <SidebarWrapper data-testid="scSidebar">
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <a href="mailto:lords@sunsetandchill.com">Email us</a>
    </SidebarWrapper>
  </div>
);

export default Sidebar;
