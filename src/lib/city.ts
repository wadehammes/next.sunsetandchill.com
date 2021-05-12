import dashify from "dashify";
import { CityDataRow } from "src/interfaces/common.interfaces";

export const slugifyCity = (cityData: CityDataRow): string =>
  dashify(cityData.city);
