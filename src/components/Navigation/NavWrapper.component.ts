import { contentfulColorMapping, device } from "src/styles/theme";
import styled, { css } from "styled-components";
import { NavigationTheme, UINavProps } from "./Navigation.interfaces";

export const NavWrapper = styled.nav<UINavProps>`
  background: ${({ backgroundColor }) =>
    backgroundColor ? contentfulColorMapping[backgroundColor] : "transparent"};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  left: 0;
  right: ${({ theme }) => theme.sizing.small};
  top: 0;
  width: 100%;
  padding: 0 ${({ theme }) => theme.sizing.small};
  z-index: 99;
  height: ${({ theme }) => theme.sizing.navHeight};
  transform: translateY(0);
  transition: transform 0.15s ease-in-out;
  border-bottom: 2px solid transparent;
  font-size: 0.95em;

  @media screen and (max-height: 800px) and (-webkit-device-pixel-ratio: 1) {
    font-size: ${({ theme }) => theme.font.nav.mobile};
  }

  ${({ navTheme, theme }) =>
    navTheme === NavigationTheme.Light &&
    css`
      border-bottom-color: ${theme.colors.purple.light};
    `}

  ${({ hideNav, theme, preview }) =>
    hideNav &&
    !preview &&
    css`
      transform: translateY(-${theme.sizing.large});
    `}

  .navLanguageSelect {
    display: none;
  }

  @media ${device.laptop} {
    .navLanguageSelect {
      display: block;
    }
  }

  ${({ preview }) =>
    preview &&
    css`
      top: 2.5em;
    `}
`;
