import { device } from "src/styles/theme";
import styled from "styled-components";
import {
  NavigationTheme,
  UINavProps,
} from "src/components/Navigation/Navigation.interfaces";

export const NavMobileToggle = styled.button<UINavProps>`
  appearance: none;
  background: transparent;
  border: 0;
  box-shadow: none;
  display: block;
  transform: translateX(-1px);
  color: ${({ theme, navTheme }) =>
    navTheme === NavigationTheme.Dark
      ? theme.colors.white
      : theme.colors.purple.dark};

  > svg {
    height: 2rem;
    width: 2rem;
  }

  &:focus {
    outline: 0;
  }

  &:hover,
  &:hover:focus {
    cursor: pointer;
    color: ${({ theme, navTheme }) =>
      navTheme === NavigationTheme.Dark
        ? theme.colors.logo
        : theme.colors.purple.main};
  }

  @media ${device.laptop} {
    display: none;
  }
`;
