import { Children } from "react";
import { useCityData } from "src/context/cityData.context";
import { parseWithCityData } from "src/lib/parseWithCityData";
import { useQueryParamString } from "src/hooks/useQueryParamString";

export const useInterpolateCityData = () => {
  const cityData = useCityData();
  const { queryParamString } = useQueryParamString();

  return (children: string | (string | JSX.Element)[]) =>
    Children.map(children, (child) => {
      if (typeof child === "string") {
        return parseWithCityData(child, cityData, queryParamString);
      } else {
        return child;
      }
    });
};
