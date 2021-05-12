import { FlexFlowTypes } from "src/interfaces/common.interfaces";
import { device } from "src/styles/theme";
import styled, { css } from "styled-components";

interface FieldsetProps {
  variant?: FlexFlowTypes;
}

export const Fieldset = styled.div<FieldsetProps>`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;

  @media ${device.mobileL} {
    width: auto;
    flex-flow: row nowrap;
  }

  @media ${device.tablet} {
    margin: 0;
  }

  /* For footer, we will want it to always be column, this will handle that */
  ${({ variant }) =>
    variant === FlexFlowTypes.Column &&
    css`
      margin: 0;
      max-width: 100%;
      width: 100% !important;
      flex-flow: column nowrap !important;

      @media ${device.tablet} {
        max-width: 16em;
      }

      /* A very hack fix for input containers */
      > div {
        width: 100%;
      }

      > * {
        margin-bottom: 0.5rem;
      }
    `}
`;
