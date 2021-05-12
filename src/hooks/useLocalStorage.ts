import { useState, useEffect } from "react";

interface GetStorage {
  key: string;
  initialValue: string;
}

interface SetStorage {
  key: string;
  value: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SetNewItem = (...args: any) => void;

const getItem = ({ key, initialValue }: GetStorage) => {
  if (typeof window === "undefined") {
    return initialValue;
  }
  try {
    const unparsedValue = window.localStorage[key];

    if (typeof unparsedValue === "undefined") {
      return initialValue;
    }

    return JSON.parse(unparsedValue);
  } catch (error) {
    return initialValue;
  }
};

const setItem: SetNewItem = ({ key, value }: SetStorage) => {
  window.localStorage[key] = JSON.stringify(value);
};

export const useLocalStorage = ({ key, initialValue }: GetStorage) => {
  const [value, setValue] = useState<GetStorage | string>(initialValue);

  useEffect(() => {
    setValue(getItem({ key, initialValue }));
  }, [key, initialValue]);

  const setNewItem: SetNewItem = (newValue: string) => {
    setValue(newValue);

    return setItem({ key, value: newValue });
  };

  return [value, setNewItem];
};
