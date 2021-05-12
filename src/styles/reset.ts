import { createGlobalStyle } from "styled-components";
import { theme } from "src/styles/theme";

export const Reset = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: inherit;
  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }
  html,
  body {
    color: ${theme.colors.white};
    font-family: "Averta", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 16px;

    @media screen and (device-width: 280px) {
      font-size: 12px;
    }

    @media only screen 
    and (device-width: 320px) 
    and (device-height: 568px) 
    and (-webkit-device-pixel-ratio : 2) { font-size: 14px; }

    @media screen and (max-height: 725px) and (min-width: 600px) {
      font-size: 14px;
    }
  }

  ::-moz-selection { background: ${theme.colors.logo}; color: white; }
  ::selection { background: ${theme.colors.logo}; color: white; }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    overflow-x: hidden;
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  p:empty {
    display: none;
    margin: 0 !important;
    padding: 0 !important;
  }
  a,a:visited {
    text-decoration: none;
  }
  [hidden], .hidden {
    display: none;
  }
`;
