export const getAllCookies = () =>
  document.cookie
    .split("; ")
    .reduce<{ [key: string]: string }>((result, cookie) => {
      const [key, value] = cookie.split("=");

      // eslint-disable-next-line no-param-reassign
      result[key] = value;

      return result;
    }, {});

export const getCookieByKey = (key: string): string | null =>
  getAllCookies()[key] ?? null;
