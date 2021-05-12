import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "src/components/Accordion/Accordion.component";
import { ThemeProvider } from "styled-components";
import { theme } from "src/styles/theme";

describe("Accordion", () => {
  it("Renders an Accordion", async () => {
    const body =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla dapibus auctor. Mauris ex nunc, interdum ut iaculis et, posuere nectellus.";

    const parent = <div>hello</div>;

    render(
      <ThemeProvider theme={theme}>
        <Accordion
          parentItem={parent}
          accordionId={0}
          accordionLabel="Accordion Label"
        >
          <span>{body}</span>
        </Accordion>
      </ThemeProvider>,
    );

    const accordion = await screen.findByTestId("accordion-0");

    userEvent.click(accordion);

    const accordionBody = await screen.findByTestId("accordionBody-0");

    await waitFor(() => {
      expect(accordionBody).toBeVisible();
    });
  });
});
