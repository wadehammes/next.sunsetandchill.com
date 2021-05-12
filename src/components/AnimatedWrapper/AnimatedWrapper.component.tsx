import { AnimatedWrapperProps } from "src/components/AnimatedWrapper/AnimatedWrapper.interfaces";
import { device } from "src/styles/theme";
import styled, { css } from "styled-components";

export const AnimatedWrapper = styled.div<AnimatedWrapperProps>`
  opacity: 0;
  transform: translateY(0);
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in;
  transition-delay: ${({ wait = 1 }) => wait * 200}ms;
  width: 100%;

  @media ${device.tablet} {
    transform: translateY(2em);
  }

  ${({ animate }) =>
    animate &&
    css`
      opacity: 1;

      @media ${device.tablet} {
        transform: translateY(0);
      }
    `}
`;
