import { FlexFlowTypes } from "src/interfaces/common.interfaces";
import { device } from "src/styles/theme";
import styled, { css } from "styled-components";

interface ButtonWrapperProps {
  variant?: FlexFlowTypes;
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  display: flex;
  justify-content: flex-end;
  margin: ${({ theme }) => theme.sizing.small} 0 0 0;
  flex: 1;
  width: 100%;

  @media ${device.mobileL} {
    margin: 0 0 0 ${({ theme }) => theme.sizing.small};
  }

  ${({ variant }) =>
    variant === FlexFlowTypes.Column &&
    css`
      margin: 0.75rem 0 0 0 !important;
    `}
`;
