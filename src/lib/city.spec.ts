import { CityDataRow } from "src/interfaces/common.interfaces";
import { slugifyCity } from "./city";

describe("slugifyCity", () => {
  it("dashifies the city name", () => {
    expect(slugifyCity({ city: "Cypress" } as CityDataRow)).toEqual("cypress");
    expect(slugifyCity({ city: "The Colony" } as CityDataRow)).toEqual(
      "the-colony",
    );
    expect(
      slugifyCity({ city: "North Richland Hills" } as CityDataRow),
    ).toEqual("north-richland-hills");
    expect(slugifyCity({ city: "" } as CityDataRow)).toEqual("");
  });
});
