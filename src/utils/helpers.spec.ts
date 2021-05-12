import { Environments } from "src/interfaces/common.interfaces";
import {
  capitalizeWords,
  appendUrlParams,
  convertRelativeUrl,
  alphabetize,
  isEven,
  isOdd,
} from "src/utils/helpers";
import { CONSTANTS as constant } from "src/utils/constants";

describe("capitalizeWords", () => {
  it("capitalizes first letter in every word", () => {
    const text = "these are some words";

    expect(capitalizeWords(text)).toEqual("These Are Some Words");
  });
});

describe("convertRelativeUrl", () => {
  it("adds https to relative urls", () => {
    expect(convertRelativeUrl("//example.com")).toEqual("https://example.com");
  });

  it("doesn't change absolute urls", () => {
    const url = "https://example.com";

    expect(convertRelativeUrl(url)).toEqual(url);
  });

  it("returns empty string for empty input", () => {
    expect(convertRelativeUrl(undefined)).toEqual("");
    expect(convertRelativeUrl("")).toEqual("");
  });
});

describe("appendUrlParams", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it("for production: should append params to url with '&' if other params are present on url", () => {
    process.env.ENVIRONMENT = Environments.Production;

    const params = "rh=marketing&referralCode=1234";
    const httpsUrl = `${constant.RH_APP_HTTPS_URL}?rcid=friends-and-family`;
    const httpUrl = `${constant.RH_APP_HTTP_URL}?rcid=friends-and-family`;

    expect(appendUrlParams(httpsUrl, params)).toEqual(
      "https://app.gotrhythm.com/?rh=marketing&referralCode=1234&rcid=friends-and-family",
    );

    expect(appendUrlParams(httpUrl, params)).toEqual(
      "https://app.gotrhythm.com/?rh=marketing&referralCode=1234&rcid=friends-and-family",
    );
  });

  it("for staging: should append params to url with '&' if other params are present on url", () => {
    const params = "rh=marketing&referralCode=1234";
    const httpsUrl = `${constant.RH_APP_HTTPS_URL}`;
    const httpUrl = `${constant.RH_APP_HTTP_URL}`;

    expect(appendUrlParams(httpsUrl, params)).toEqual(
      `https://app.staging.gotrhythm.com/?rh=marketing&referralCode=1234&rcid=${constant.RH_DEFAULT_CAMPAIGN_ID}`,
    );

    expect(appendUrlParams(httpUrl, params)).toEqual(
      `https://app.staging.gotrhythm.com/?rh=marketing&referralCode=1234&rcid=${constant.RH_DEFAULT_CAMPAIGN_ID}`,
    );
  });

  it("for production: should append params to url with '?' if no params are present on url", () => {
    process.env.ENVIRONMENT = Environments.Production;

    const params = "rh=marketing&referralCode=1234";
    const url = constant.RH_APP_HTTPS_URL;

    expect(appendUrlParams(url, params)).toEqual(
      `https://app.gotrhythm.com/?rh=marketing&referralCode=1234&rcid=${constant.RH_DEFAULT_CAMPAIGN_ID}`,
    );
  });

  it("for staging: should append params to url with '?' if no params are present on url", () => {
    const params = "rh=marketing&referralCode=1234";
    const url = constant.RH_APP_HTTPS_URL;

    expect(appendUrlParams(url, params)).toEqual(
      `https://app.staging.gotrhythm.com/?rh=marketing&referralCode=1234&rcid=${constant.RH_DEFAULT_CAMPAIGN_ID}`,
    );
  });

  it("for production: should remove beginning '?' or '&' from passed params prior to adding them to url", () => {
    process.env.ENVIRONMENT = Environments.Production;

    const paramsAnd = "&rh=marketing&referralCode=1234";
    const paramsQuestion = "?rh=marketing&referralCode=1234";
    const url = constant.RH_APP_HTTPS_URL;
    const urlWithParams = `${constant.RH_APP_HTTPS_URL}/sign-up/plans?rcid=friends-and-family`;

    expect(appendUrlParams(url, paramsAnd)).toEqual(
      `https://app.gotrhythm.com/?rh=marketing&referralCode=1234&rcid=${constant.RH_DEFAULT_CAMPAIGN_ID}`,
    );

    expect(appendUrlParams(url, paramsQuestion)).toEqual(
      `https://app.gotrhythm.com/?rh=marketing&referralCode=1234&rcid=${constant.RH_DEFAULT_CAMPAIGN_ID}`,
    );

    expect(appendUrlParams(urlWithParams, paramsQuestion)).toEqual(
      "https://app.gotrhythm.com/sign-up/plans?rh=marketing&referralCode=1234&rcid=friends-and-family",
    );

    expect(appendUrlParams(urlWithParams, paramsAnd)).toEqual(
      "https://app.gotrhythm.com/sign-up/plans?rh=marketing&referralCode=1234&rcid=friends-and-family",
    );
  });

  it("for staging: should remove beginning '?' or '&' from passed params prior to adding them to url", () => {
    const paramsAnd = "&rh=marketing&referralCode=1234";
    const paramsQuestion = "?rh=marketing&referralCode=1234";
    const url = constant.RH_APP_HTTPS_URL;
    const urlWithParams = `${constant.RH_APP_HTTPS_URL}?rcid=friends-and-family`;

    expect(appendUrlParams(url, paramsAnd)).toEqual(
      `https://app.staging.gotrhythm.com/?rh=marketing&referralCode=1234&rcid=${constant.RH_DEFAULT_CAMPAIGN_ID}`,
    );

    expect(appendUrlParams(url, paramsQuestion)).toEqual(
      `https://app.staging.gotrhythm.com/?rh=marketing&referralCode=1234&rcid=${constant.RH_DEFAULT_CAMPAIGN_ID}`,
    );

    expect(appendUrlParams(urlWithParams, paramsQuestion)).toEqual(
      "https://app.staging.gotrhythm.com/?rh=marketing&referralCode=1234&rcid=friends-and-family",
    );

    expect(appendUrlParams(urlWithParams, paramsAnd)).toEqual(
      "https://app.staging.gotrhythm.com/?rh=marketing&referralCode=1234&rcid=friends-and-family",
    );
  });

  it("should return the original passed url if the url isn't an app url", () => {
    const emailUrl = "mailto:press@gotrhythm.com";
    const otherUrl = "http://fat-pie.com";
    const params = "?rh=marketing&referralCode=1234";

    expect(appendUrlParams(emailUrl, params)).toEqual(
      "mailto:press@gotrhythm.com",
    );

    expect(appendUrlParams(otherUrl, params)).toEqual("http://fat-pie.com");
  });
});

describe("alphabetize", () => {
  it("alphabetizes an array of objects by key", () => {
    const array = [{ slug: "wade" }, { slug: "hello" }];

    expect(alphabetize(array, "slug")).toEqual([
      { slug: "hello" },
      { slug: "wade" },
    ]);
  });

  it("will return the array if the key isn't a string", () => {
    const array = [
      { slug: { wade: "is cool" } },
      { slug: { minta: "is the best cat" } },
    ];

    expect(alphabetize(array, "slug")).toEqual(array);
  });
});

describe("isEven", () => {
  it("returns true if the number is even", () => {
    expect(isEven(2)).toBe(true);
  });

  it("returns false if the number is not even", () => {
    expect(isEven(3)).toBe(false);
  });
});

describe("isOdd", () => {
  it("returns true if the number is odd", () => {
    expect(isOdd(23)).toBe(true);
  });

  it("returns false if the number is not even", () => {
    expect(isOdd(16)).toBe(false);
  });
});
