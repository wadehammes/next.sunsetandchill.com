import { device } from "src/styles/theme";
import styled from "styled-components";
import {
  NavigationTheme,
  UINavProps,
} from "src/components/Navigation/Navigation.interfaces";
import { NavSubMenu } from "src/components/Navigation/NavSubMenu.component";

export const NavItem = styled.span<UINavProps>`
  color: ${({ theme, navTheme }) =>
    navTheme === NavigationTheme.Dark
      ? theme.colors.white
      : theme.colors.purple.dark};

  &:hover {
    cursor: pointer;
  }
`;

export const NavParent = styled.div`
  user-select: none;
`;

export const NavItems = styled.ul<UINavProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: ${({ theme }) => theme.sizing.large};

  a,
  ${NavParent} {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: ${({ theme, navTheme }) =>
      navTheme === NavigationTheme.Dark
        ? theme.colors.white
        : theme.colors.purple.dark};
    height: 100%;
    padding: 0 ${({ theme }) => theme.sizing.small};

    ${NavItem} {
      color: inherit;
    }
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-decoration: none;
    padding: 0;
    color: ${({ theme, navTheme }) =>
      navTheme === NavigationTheme.Dark
        ? theme.colors.white
        : theme.colors.purple.dark};
    font-weight: ${({ theme }) => theme.font.nav.fontWeight};
    letter-spacing: ${({ theme }) => theme.font.nav.letterSpacing};
    transition: border 0.25s ease-in-out;

    @media ${device.tablet} {
      border-bottom: 2px solid transparent;
    }

    &.parentLi {
      height: 100%;
    }

    &.navPages,
    &.navAccountLogin,
    &.navPhone {
      display: none;
    }

    &.navPhone {
      padding-left: ${({ theme }) => theme.sizing.small};
      margin-left: ${({ theme }) => theme.sizing.small};
    }

    &:hover,
    &:focus-within {
      color: ${({ theme, navTheme }) =>
        navTheme === NavigationTheme.Dark
          ? theme.colors.logo
          : theme.colors.purple};
      border-bottom-color: ${({ theme, navTheme }) =>
        navTheme === NavigationTheme.Dark
          ? theme.colors.logo
          : theme.colors.purple.variants.neon};

      a ${NavItem} {
        color: ${({ theme, navTheme }) =>
          navTheme === NavigationTheme.Dark
            ? theme.colors.logo
            : theme.colors.purple.variants.neon};
      }

      ${NavSubMenu} {
        opacity: 1;
        pointer-events: all;
      }

      ${NavParent} {
        color: ${({ theme, navTheme }) =>
          navTheme === NavigationTheme.Dark
            ? theme.colors.logo
            : theme.colors.purple.variants.neon};
      }
    }

    &[data-type="button"] {
      padding: 0;

      a {
        height: auto;
        padding: 0.65em 1em;
      }

      @media ${device.tablet} {
        padding: 0 0.5rem 0 1.5rem;
      }
    }

    &[data-type="button"],
    &[data-type="button"]:hover {
      background: transparent;
      color: white !important;
      border: 0 !important;
    }

    ul {
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
      background: ${({ theme }) => theme.colors.white};
      border-radius: ${({ theme }) => theme.borderRadius.menu};
      width: 100%;
      padding: 0.5em;

      > li:not([data-type="button"]) {
        padding: 0.5em;
        justify-content: flex-start;

        a {
          color: ${({ theme }) => theme.colors.primary.dark};
          justify-content: flex-start;
          padding: 0 0.5em;

          ${NavItem} {
            color: ${({ theme }) => theme.colors.primary.dark} !important;
          }
        }

        &:hover {
          border-color: transparent;

          a {
            text-decoration: underline;
          }
        }
      }
    }

    @media ${device.tablet} {
      &.navPhone {
        display: flex;
      }
    }

    @media ${device.laptop} {
      &.navPages,
      &.navAccountLogin {
        display: flex;
      }
    }
  }
`;
