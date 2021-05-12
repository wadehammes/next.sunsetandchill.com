import { Alignment, FlexFlowTypes } from "src/interfaces/common.interfaces";
import { device } from "src/styles/theme";
import styled, { css } from "styled-components";

interface FormProps {
  variant?: FlexFlowTypes;
  align?: Alignment;
}

export const Form = styled.form<FormProps>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  @media ${device.tablet} {
    justify-content: center;

    ${({ variant, align }) =>
      (variant === FlexFlowTypes.Column || align === Alignment.Left) &&
      css`
        justify-content: flex-start;

        fieldset {
          justify-content: flex-start;
        }
      `}
  }
`;
