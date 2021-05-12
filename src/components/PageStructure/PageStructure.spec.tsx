import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { PageStructure } from "src/components/PageStructure/PageStructure.component";

const testId = "scPageStructure";

describe("PageStructure", () => {
  it("renders PageStructure", async () => {
    render(<PageStructure />);

    const component = await screen.findByTestId(testId);

    await waitFor(() => {
      expect(component).toBeVisible();
    });
  });
});
