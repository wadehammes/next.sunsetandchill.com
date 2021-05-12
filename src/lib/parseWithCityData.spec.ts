import { parseWithCityData } from "./parseWithCityData";

describe("parseWithCityData", () => {
  it("replaces provided values", () => {
    const replacements = {
      batman: "Bruce Wayne",
      Venom: "Eddie Brock",
      "Spider-Man": "Peter Parker",
      "Wonder Woman": "Diana Prince",
    };

    expect(
      parseWithCityData(
        "Holy hole in a donut, {{ batman }}!",
        replacements,
        "en",
      ),
    ).toEqual(["Holy hole in a donut, ", "Bruce Wayne", "!"]);

    expect(
      parseWithCityData("Holy {{ batman }}, {{ batman }}!", replacements, ""),
    ).toEqual(["Holy ", "Bruce Wayne", ", ", "Bruce Wayne", "!"]);

    expect(
      parseWithCityData(
        "{{ Venom }}, {{ Spider-Man }}, and {{ Wonder Woman }} walk into a bar",
        replacements,
        "en",
      ),
    ).toEqual([
      "Eddie Brock",
      ", ",
      "Peter Parker",
      ", and ",
      "Diana Prince",
      " walk into a bar",
    ]);
  });

  it("does not replace unknown values", () => {
    const replacements = {
      flavor: "chocolate",
    };

    expect(
      parseWithCityData(
        "I love {{ flavor }} ice cream with {{ toppings }}",
        replacements,
        "en",
      ),
    ).toEqual(["I love ", "chocolate", " ice cream with ", "{{ toppings }}"]);
  });

  it("does not replace single brackets", () => {
    const replacements = {
      city: "Gotham",
    };

    expect(parseWithCityData("{ city }", replacements, "")).toEqual([
      "{ city }",
    ]);
    expect(parseWithCityData("{ { city } }", replacements, "")).toEqual([
      "{ { city } }",
    ]);
  });

  it("does nothing when provided no replacements", () => {
    expect(parseWithCityData("{{ city }}, {{ state }}", {}, "")).toEqual([
      "{{ city }}",
      ", ",
      "{{ state }}",
    ]);
  });

  it("returns undefined if text is undefined", () => {
    const replacements = {
      city: "Gotham",
    };

    expect(parseWithCityData(undefined, replacements, "")).toEqual([]);
  });

  it("doesn't care about whitespace", () => {
    const replacements = {
      city: "Gotham",
    };

    expect(
      parseWithCityData(
        "{{city}} {{city }} {{ city}} {{ city }} {{    city    }}",
        replacements,
        "en",
      ),
    ).toEqual([
      "Gotham",
      " ",
      "Gotham",
      " ",
      "Gotham",
      " ",
      "Gotham",
      " ",
      "Gotham",
    ]);
  });
});
