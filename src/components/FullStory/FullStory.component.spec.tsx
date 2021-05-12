import { render } from "@testing-library/react";
import React from "react";

import { mocked } from "ts-jest/utils";
import * as FullStorySdk from "@fullstory/browser";
import { random } from "faker";
import { FullStory } from "./FullStory.component";

jest.mock("@fullstory/browser");
const mockFullStorySdk = mocked(FullStorySdk, true);

describe("FullStory", () => {
  afterEach(() => {
    delete process.env.FULLSTORY_ORG_ID;
    delete process.env.ENVIRONMENT;
  });

  it("should initialize FullStory in dev mode", () => {
    const orgId = random.alphaNumeric();

    process.env.FULLSTORY_ORG_ID = orgId;
    process.env.ENVIRONMENT = "local";

    render(<FullStory />);

    expect(mockFullStorySdk.init).toHaveBeenCalledWith({
      orgId,
      namespace: "FullStory",
      devMode: true,
    });
  });

  it("should initialize FullStory not in dev mode", () => {
    const orgId = random.alphaNumeric();
    const env = random.arrayElement(["staging", "production", "test"]);

    process.env.FULLSTORY_ORG_ID = orgId;
    process.env.ENVIRONMENT = env;

    render(<FullStory />);

    expect(mockFullStorySdk.init).toHaveBeenCalledWith({
      orgId,
      namespace: "FullStory",
      devMode: false,
    });
  });
});
