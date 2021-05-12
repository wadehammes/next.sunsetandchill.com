/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals */
import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks/server";
import { CONSTANTS } from "src/utils/constants";
import { useUrlParam } from "src/hooks/useUrlParam";

describe("useUrlParam", () => {
  const urlParam = "abcd1234";

  afterEach(() => {
    window.localStorage.clear();
  });

  it("should get referral code from localStorage if present", async () => {
    await waitFor(() =>
      window.localStorage.setItem(CONSTANTS.RH_REFERRAL_CODE_STORAGE, urlParam),
    );

    expect(
      window.localStorage.getItem(CONSTANTS.RH_REFERRAL_CODE_STORAGE),
    ).toEqual(urlParam);

    const { result, hydrate } = renderHook(() =>
      useUrlParam({
        queryParam: CONSTANTS.RH_REFERRAL_CODE_PARAM,
        storageParam: CONSTANTS.RH_REFERRAL_CODE_STORAGE,
      }),
    );

    hydrate();

    expect(result.current[0]).toBe(urlParam);
    expect(result.current[1]).toBe(
      `${CONSTANTS.RH_REFERRAL_CODE_PARAM}=${urlParam}`,
    );
  });

  it("should get rcid from url if present", () => {
    // Replace URL with one that includes urlParam query param
    history.replaceState({}, "Test", `/?rcid=${urlParam}`);

    expect(window.location.href).toEqual(`http://localhost/?rcid=${urlParam}`);

    // Make sure localStorage rhRCID value is null
    expect(window.localStorage.getItem(CONSTANTS.RH_RCID_STORAGE)).toEqual(
      null,
    );

    const { result, hydrate } = renderHook(() =>
      useUrlParam({
        queryParam: CONSTANTS.RH_RCID_PARAM,
        storageParam: CONSTANTS.RH_RCID_STORAGE,
      }),
    );

    hydrate();

    // Check that the hook set rhRCID in localStorage and in hook state
    expect(window.localStorage.getItem(CONSTANTS.RH_RCID_STORAGE)).toEqual(
      urlParam,
    );
    expect(result.current[0]).toBe(urlParam);
    expect(result.current[1]).toBe(`${CONSTANTS.RH_RCID_PARAM}=${urlParam}`);
  });

  it("should return nothing if no params", () => {
    // Replace URL with one that includes urlParam query param
    history.replaceState({}, "Test", "/");

    expect(window.location.href).toEqual("http://localhost/");

    // Make sure localStorage rhRCID value is null
    expect(window.localStorage.getItem(CONSTANTS.RH_RCID_STORAGE)).toEqual(
      null,
    );

    const { result, hydrate } = renderHook(() =>
      useUrlParam({
        queryParam: CONSTANTS.RH_RCID_PARAM,
        storageParam: CONSTANTS.RH_RCID_STORAGE,
      }),
    );

    hydrate();

    // Check that the hook set nothing
    expect(window.localStorage.getItem(CONSTANTS.RH_RCID_STORAGE)).toEqual(
      null,
    );
    expect(result.current[0]).toBe("");
    expect(result.current[1]).toBe("");
  });
});
