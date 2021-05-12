import React, { FC } from "react";
import Link from "next/link";
import { device } from "src/styles/theme";
import styled from "styled-components";
import { Container } from "src/components/Layout";
import { Logo } from "src/components/Logo";
import { Email } from "src/components/Icons/Email.icon";
import { Facebook } from "src/components/Icons/Facebook.icon";
import { Instagram } from "src/components/Icons/Instagram.icon";

export const SidebarWrapper = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: column nowrap;
  text-align: center;
  height: 100%;
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  overflow-y: scroll;

  @media ${device.tablet} {
    position: fixed;
    width: ${({ theme }) => theme.grid.sidebar.tablet};
  }

  @media ${device.laptop} {
    width: ${({ theme }) => theme.grid.sidebar.laptop};
  }
`;

const Social = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover svg {
    opacity: 0.5;
  }

  svg {
    margin: 0 0.75em;
    width: 1.5em;
    height: 1.5em;
    transition: opacity 0.25s ease-in;

    &:hover {
      opacity: 1;
    }
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
      <p>
        Sunset & Chill is a semi-regular community dance and arts event based in
        Washington D.C. showcasing fire and flow artists, music, and vendors.
      </p>
      <p>
        The event was originally formed as a way to give fire and flow artists a
        safe space to practice their art, but it has evolved into a community
        affair bringing artists and community together around music, dancing,
        arts, and of course, a beautiful sunset.
      </p>
      <Social>
        <a href="mailto:lords@sunsetandchill.com">
          <Email />
        </a>
        <a href="https://www.instagram.com/sunsetnchilldc/">
          <Instagram />
        </a>
        <a href="https://www.facebook.com/sunsetnchill">
          <Facebook />
        </a>
      </Social>
    </SidebarWrapper>
  </div>
);

export default Sidebar;
