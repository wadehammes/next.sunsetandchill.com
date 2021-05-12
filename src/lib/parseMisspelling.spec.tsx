import React from "react";
import { Misspelling, parseMisspelling } from "src/lib/parseMisspelling";

describe("parseMisspelling", () => {
  it("replaces provided values", () => {
    expect(parseMisspelling("Holy hole in a donut, ~~batman~~!")).toEqual([
      "Holy hole in a donut, ",
      <Misspelling>batman</Misspelling>,
      "!",
    ]);
  });

  it("does not replace values if no ~~", () => {
    expect(
      parseMisspelling("I love chocolate ice cream with toppings"),
    ).toEqual(["I love chocolate ice cream with toppings"]);
  });

  it("does not replace single squiggles", () => {
    expect(parseMisspelling("~ rhtyhm ~")).toEqual(["~ rhtyhm ~"]);
    expect(parseMisspelling("~ ~ rhtyhm ~ ~")).toEqual(["~ ~ rhtyhm ~ ~"]);
  });

  it("returns undefined if text is undefined", () => {
    expect(parseMisspelling(undefined)).toEqual([]);
  });

  it("doesn't care about whitespace", () => {
    expect(
      parseMisspelling(
        "~~city~~ ~~city ~~ ~~ city~~ ~~ city ~~ ~~    city    ~~",
      ),
    ).toEqual([
      <Misspelling>city</Misspelling>,
      " ",
      <Misspelling>city</Misspelling>,
      " ",
      <Misspelling>city</Misspelling>,
      " ",
      <Misspelling>city</Misspelling>,
      " ",
      <Misspelling>city</Misspelling>,
    ]);
  });
});
