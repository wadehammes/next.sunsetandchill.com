import { device } from "src/styles/theme";
import styled from "styled-components";
import {
  NavigationTheme,
  UINavProps,
} from "src/components/Navigation/Navigation.interfaces";

export const NavLogo = styled.div<UINavProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  height: ${({ theme }) => theme.sizing.large};

  @media ${device.laptop} {
    justify-content: flex-start;
    text-align: left;
  }

  svg {
    fill: ${({ theme, navTheme }) =>
      navTheme === NavigationTheme.Dark
        ? theme.colors.logo
        : theme.colors.purple.dark};
    width: 7em;
    position: absolute;
    left: 50%;
    top: 0.5em;
    margin-left: -3.5em;

    &:hover {
      fill: ${({ theme, navTheme }) =>
        navTheme === NavigationTheme.Dark
          ? theme.colors.logo
          : theme.colors.purple.variants.neon};
    }

    @media ${device.laptop} {
      position: relative;
      left: 0;
      top: 0;
      margin-left: 0;
    }
  }
`;
