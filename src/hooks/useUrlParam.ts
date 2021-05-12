import { useEffect, useState } from "react";

interface UrlParam {
  queryParam: string;
  storageParam: string;
  defaultValue?: string;
}

export const useUrlParam = ({
  queryParam,
  storageParam,
  defaultValue = "",
}: UrlParam) => {
  const [param, setParam] = useState<string>(defaultValue);
  const [paramToString, setParamToString] = useState<string>("");

  useEffect(() => {
    const {
      location: { search },
      localStorage,
    } = window;

    const localParam = localStorage.getItem(storageParam) ?? "";

    // Set initial value either from localStorage or the defaultValue
    if (localParam) {
      setParam(localParam);
    } else if (defaultValue) {
      setParam(defaultValue);
    }

    // Check it current location has params we need
    if (search) {
      const currentSearchParams = new URLSearchParams(search);

      if (
        currentSearchParams.has(queryParam) &&
        currentSearchParams.get(queryParam) !== localParam
      ) {
        const urlParam = currentSearchParams.get(queryParam);

        if (urlParam) {
          localStorage.setItem(storageParam, urlParam);
          setParam(urlParam);
        }
      }
    }
  }, [queryParam, storageParam, defaultValue]);

  useEffect(() => {
    if (param) {
      setParamToString(`${queryParam}=${param}`);
    }
  }, [queryParam, param]);

  return [param, paramToString];
};
