import { ContentfulColors } from "src/interfaces/common.interfaces";
import { FontWeight } from "./enums/FontWeight.enum";

export const trueBlack = "#171619";
export const trueWhite = "#FFFFFF";

export const grey = {
  50: "#F5F5F7",
  100: "#EDEBF0",
  200: "#CCC9D1",
  300: "#ABA7B2",
  400: "#918D99",
  500: "#777380",
  600: "#5E5A66",
  700: "#45414C",
  800: "#2E2B33",
  900: "#171619",
};

export const purple = {
  dark: "#1C0042",
  main: "#370084",
  light: "#F2F2FF",
  variants: {
    bright: "#4500A5",
    brighter: "#5421B7",
    brightest: "#6948C9",
    headline: "#290063",
    neon: "#9633FF",
    hero: "#D8D4F8",
    logo: "#C085FF",
  },
};

export const green = {
  main: "#C8FAE3",
};

export const red = {
  main: "#E9574F",
};

export const yellow = {
  main: "#FAD06A",
  light: "#FFE4A3",
  dark: "#FFCB4B",
};

export const { logo } = purple.variants;

export const buttons = {
  primary: {
    main: purple.variants.neon,
    hover: purple.variants.brightest,
    active: purple.variants.bright,
  },
  darkPrimary: {
    main: purple.variants.bright,
    hover: purple.variants.headline,
    active: purple.dark,
  },
  secondary: {
    main: logo,
  },
  yellow: {
    main: yellow.main,
    hover: yellow.light,
    active: yellow.dark,
  },
};

export const backgrounds = {
  purple: {
    dark: purple.dark,
    main: purple.main,
    light: purple.light,
  },
};

export const breakpoints = {
  mobileS: "350px",
  mobileM: "376px",
  mobileL: "500px",
  tablet: "768px",
  tabletVert: "700px",
  laptopVert: "960px",
  laptop: "1120px",
  desktop: "1440px",
  desktopM: "1920px",
  desktopL: "2560px",
};

export const device = {
  mobileS: `(min-width: ${breakpoints.mobileS})`,
  mobileM: `(min-width: ${breakpoints.mobileM})`,
  mobileL: `(min-width: ${breakpoints.mobileL})`,
  tablet: `(min-width: ${breakpoints.tablet})`,
  tabletVert: `(min-height: ${breakpoints.tabletVert})`,
  laptop: `(min-width: ${breakpoints.laptop})`,
  laptopVert: `(min-height: ${breakpoints.laptopVert})`,
  desktop: `(min-width: ${breakpoints.desktop})`,
  desktopM: `(min-width: ${breakpoints.desktopM})`,
  desktopL: `(min-width: ${breakpoints.desktop})`,
};

export const font = {
  h1: {
    mobile: "2rem",
    tablet: "3.75rem",
    fontWeight: FontWeight.Semibold,
    lineHeight: 1.1,
  },
  h2: {
    mobile: "2rem",
    tablet: "3.75rem",
    fontWeight: FontWeight.Semibold,
    lineHeight: 1.1,
  },
  h3: {
    mobile: "1.125rem",
    tablet: "1.3rem",
    letterSpacing: "0.02em",
    fontWeight: FontWeight.Light,
    lineHeight: 1.2,
  },
  h4: {
    mobile: "1.375rem",
    fontWeight: FontWeight.Semibold,
    lineHeight: 1.4,
  },
  p: {
    mobile: "1.125rem",
    fontWeight: FontWeight.Regular,
    lineHeight: 1.5,
  },
  contentCard: {
    copy: {
      mobile: "1rem",
      letterSpacing: "0.02em",
      fontWeight: FontWeight.Light,
      lineHeight: 1.4,
    },
  },
  planCard: {
    copy: {
      mobile: "0.875rem",
    },
  },
  copyMediaRow: {
    h2: {
      mobile: "2rem",
      tablet: "2.5rem",
    },
  },
  userReviews: {
    userName: {
      mobile: "1rem",
      tablet: "1rem",
      fontWeight: FontWeight.Semibold,
      lineHeight: 1.375,
    },
    userReview: {
      mobile: "0.875rem",
      fontWeight: FontWeight.Regular,
      lineHeight: 1.4,
    },
  },
  nav: {
    mobile: "0.875rem",
    fontWeight: FontWeight.Light,
    letterSpacing: "0.02em",
    lineHeight: 1,
    variants: {
      light: {
        fontWeight: FontWeight.Regular,
      },
    },
  },
  footer: {
    h3: {
      fontSize: "1.25rem",
      lineHeight: 1,
    },
    p: {
      fontSize: "0.875rem",
      lineHeight: 1,
    },
  },
  buttons: {
    letterSpacing: "0.02em",
    lineHeight: 1,
  },
};

export const theme = {
  colors: {
    primary: {
      main: purple.main,
      light: purple.light,
      dark: purple.dark,
    },
    purple,
    purpleGradient: `linear-gradient(${backgrounds.purple.dark}, ${backgrounds.purple.main} 95%)`,
    purpleGradientReversed: `linear-gradient(${backgrounds.purple.main}, ${backgrounds.purple.dark} 80%)`,
    white: trueWhite,
    black: trueBlack,
    backgrounds,
    buttons,
    logo,
    grey,
    green,
    red,
    yellow,
  },
  font,
  sizing: {
    main: "2rem",
    small: "1rem",
    large: "4rem",
    sections: {
      mobile: "5rem 0",
      laptop: "7.5rem 0",
    },
    hero: {
      mobile: "3rem",
      laptop: "5rem",
    },
    container: "90em",
    navHeight: "4rem",
    lottieHeight: "33.75em",
  },
  borderRadius: {
    menu: "5px",
    card: "10px",
  },
};

// Map colors appropriately from contentful entry responses
export const contentfulColorMapping = {
  Purple: theme.colors.backgrounds.purple.main,
  LightPurple: theme.colors.backgrounds.purple.light,
  DarkPurple: theme.colors.backgrounds.purple.dark,
  BrightPurple: theme.colors.purple.variants.bright,
  BrighterPurple: theme.colors.purple.variants.brighter,
  HeadlinePurple: theme.colors.purple.variants.headline,
  NeonPurple: theme.colors.purple.variants.neon,
  LogoPurple: theme.colors.logo,
  HeroPurple: theme.colors.purple.variants.hero,
  White: theme.colors.white,
  Black: theme.colors.black,
  LightGrey: theme.colors.backgrounds.purple.light,
  Grey: theme.colors.grey[500],
  DarkGrey: theme.colors.grey[900],
  MintGreen: theme.colors.green.main,
  PurpleGradient: theme.colors.backgrounds.purple.dark,
  PurpleGradientReversed: theme.colors.backgrounds.purple.main,
  GreyPurpleGradient: theme.colors.backgrounds.purple.light,
  LightPurpleWhiteGradient: theme.colors.backgrounds.purple.light,
  WhiteLightPurpleGradient: theme.colors.white,
  PurpleNeonPurpleGradient: theme.colors.backgrounds.purple.dark,
  LightPurpleNeonPurpleGradient: theme.colors.backgrounds.purple.light,
  transparent: "transparent",
  Transparent: "transparent",
  Red: theme.colors.red.main,
};

export const darkBackgrounds: ContentfulColors[] = [
  ContentfulColors.Black,
  ContentfulColors.Purple,
  ContentfulColors.DarkPurple,
  ContentfulColors.BrightPurple,
  ContentfulColors.BrighterPurple,
  ContentfulColors.DarkGrey,
  ContentfulColors.PurpleGradient,
  ContentfulColors.PurpleGradientReversed,
  ContentfulColors.PurpleNeonPurpleGradient,
  ContentfulColors.NeonPurple,
];

export const hasDarkBackground = (color: ContentfulColors): boolean =>
  color ? Boolean(darkBackgrounds.includes(color)) : false;
