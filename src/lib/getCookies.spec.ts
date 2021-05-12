import { getAllCookies } from "src/lib/getCookies";

Object.defineProperty(window.document, "cookie", { configurable: true });

describe("getAllCookies", () => {
  describe("there are cookies present", () => {
    beforeEach(() => {
      Object.defineProperty(window.document, "cookie", {
        value: "_ga=GA1.2.3.4.5; cookie=monster; other=stuff; ",
      });
    });

    it("returns the value of key '_ga'", () => {
      const cookies = getAllCookies();

      expect(cookies._ga).toEqual("GA1.2.3.4.5"); // eslint-disable-line no-underscore-dangle
    });

    it("returns the value of keys", () => {
      const cookies = getAllCookies();

      expect(cookies.cookie).toEqual("monster");
      expect(cookies.other).toEqual("stuff");
    });
  });

  describe("no cookies are present", () => {
    beforeEach(() => {
      Object.defineProperty(window.document, "cookie", {
        value: "",
      });
    });

    it("returns null", () => {
      const cookies = getAllCookies();

      expect(cookies).toEqual({});
    });
  });
});
