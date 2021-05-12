import { Environments } from "src/interfaces/common.interfaces";
import { CONSTANTS as constant } from "./constants";

// Set body overflow to hidden
export const bodyOverflow = (hide: boolean) => {
  if (hide) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};

// Capitalize first letter of every word in a string
export const capitalizeWords = (text: string) =>
  text.replace(/\b\w/g, (l) => l.toUpperCase());

// Convert a protocol relative url ("//example.com") to an absolute url ("https://example.com")
export const convertRelativeUrl = (url?: string): string => {
  if (url && url.startsWith("//")) {
    return `https:${url}`;
  }

  return url ?? "";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const alphabetize = (array: Record<string, any>[], key: string) => array.sort((a, b) => {
    const keyIsString =
      typeof a[key] === "string" && typeof b[key] === "string";

    if (keyIsString) {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
    }

    return 0;
  });

// Safely append params to URLs in our Nav, CTAs, etc.
export const appendUrlParams = (url: string, params: string) => {
  // We don't want to pass params to any non-app urls
  if (
    url.startsWith(constant.RH_APP_HTTPS_URL) ||
    url.startsWith(constant.RH_APP_HTTP_URL)
  ) {
    const initialUrl = new URL(url);
    const initialUrlParams = new URLSearchParams(initialUrl.search);
    const additionalParams = new URLSearchParams(params ?? "");

    // If the initial url params contains an RCID, let it take precedence
    if (initialUrlParams.has(constant.RH_RCID_PARAM)) {
      additionalParams.delete(constant.RH_RCID_PARAM);
    }

    // Let's combine the two sets so we can work with them easier
    const combinedParams = new URLSearchParams(
      `${additionalParams.toString()}&${initialUrlParams.toString()}`,
    );

    // Set to default campaign if no rcid is present
    if (!combinedParams.has(constant.RH_RCID_PARAM)) {
      combinedParams.append(
        constant.RH_RCID_PARAM,
        constant.RH_DEFAULT_CAMPAIGN_ID,
      );
    }

    // If on staging/local, point urls to staging app
    const updatedUrl = new URL(
      `${
        process.env.ENVIRONMENT !== Environments.Production
          ? constant.RH_STAGING_APP_HTTPS_URL
          : constant.RH_APP_HTTPS_URL
      }${initialUrl.pathname}?${combinedParams.toString()}`,
    );

    // Return url with additionalParams appended
    return updatedUrl.href;
  } else {
    return url;
  }
};

export const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const isEven = (n: number) => n % 2 === 0;
export const isOdd = (n: number) => Math.abs(n % 2) === 1;
