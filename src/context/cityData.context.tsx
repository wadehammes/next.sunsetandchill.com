import { createContext, useContext } from "react";
import { CityDataRow } from "src/interfaces/common.interfaces";

export const CityDataContext = createContext({} as CityDataRow);

export const useCityData = () => useContext(CityDataContext);
