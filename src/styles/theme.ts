export const theme = {
  colors: {
    black: "#171717",
    white: "#fdfdff",
    trueWhite: "#FFF",
    trueBlack: "#000",
  },
  padding: {
    mobile: "3em",
    desktop: "5em",
  },
  grid: {
    sidebar: "32em",
  },
};

export const breakpoints = {
  mobileS: "384px",
  mobileM: "576px",
  mobileL: "672px",
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
