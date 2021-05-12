import React from "react";
import { render, screen, waitFor } from "test-utils";
import { Sidebar } from "src/components/Sidebar/Sidebar.component";

const testId = "scSidebar"

describe("Sidebar", () => {
  it("renders Sidebar", async () => {
    render(<Sidebar />);

    const component = await screen.findByTestId(testId);

    await waitFor(() => {
      expect(component).toBeVisible();
    });
  });
});
