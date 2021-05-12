/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals */
import { renderHook } from "@testing-library/react-hooks/server";
import { useQueryParamString } from "src/hooks/useQueryParamString";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("useQueryParamString", () => {
  const referralCode = "abcd1234";

  beforeAll(() => {
    useRouter.mockImplementation(() => ({
      locale: "en",
    }));
  });

  it("should return the query param string with only locale and rcid", () => {
    const { result, hydrate } = renderHook(() => useQueryParamString());

    hydrate();

    expect(result.current.queryParamString).toBe("locale=en&rcid=default");
  });

  it("should return query param string with locale, referralCode, and rcid", () => {
    // Replace URL with one that includes referralCode query param
    history.replaceState(
      {},
      "Test",
      `/?referralCode=${referralCode}&rcid=1234`,
    );

    expect(window.location.href).toEqual(
      `http://localhost/?referralCode=${referralCode}&rcid=1234`,
    );

    const { result, hydrate } = renderHook(() => useQueryParamString());

    hydrate();

    expect(result.current.queryParamString).toBe(
      `locale=en&referralCode=${referralCode}&rcid=1234`,
    );
  });
});
