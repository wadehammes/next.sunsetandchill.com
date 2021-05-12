import styled, { css } from "styled-components";
import { device, breakpoints } from "src/styles/theme";
import { FontWeight } from "src/styles/enums/FontWeight.enum";
import {
  PageSectionLayoutTypes,
  SectionSize,
} from "src/components/PageSection/PageSection.interfaces";
import { Alignment, GridAlignment } from "src/interfaces/common.interfaces";

interface ContainerProps {
  sectionWidth?: SectionSize;
  align?: Alignment;
}

export const Container = styled.div<ContainerProps>`
  display: block;
  padding: 0 ${({ theme }) => theme.sizing.main};
  margin: 0 auto;
  max-width: ${breakpoints.laptop};
  width: 100%;

  ${({ sectionWidth }) =>
    sectionWidth === SectionSize.FullWidth &&
    css`
      max-width: 100%;
      padding: 0;
    `};

  ${({ align }) =>
    align &&
    align === Alignment.Center &&
    css`
      text-align: center;
    `}
`;

export const PostContainer = styled.span`
  display: block;
  padding: 0 ${({ theme }) => theme.sizing.main};
  margin: 0 auto;
  max-width: 85ch;
  width: 100%;
`;

interface GridProps {
  variant?: PageSectionLayoutTypes;
  initialHeight?: string | number;
  gridAlignment?: GridAlignment;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-gap: ${({ theme }) => theme.sizing.main};
  grid-template-columns: 1fr;
  align-items: stretch;
  min-height: ${({ initialHeight }) => initialHeight || 0};
  justify-items: center;
  position: relative;

  & + & {
    margin-top: ${({ theme }) => theme.sizing.main};
  }

  ${({ gridAlignment }) =>
    gridAlignment === GridAlignment.End &&
    css`
      align-items: flex-end;
    `}

  ${({ variant }) =>
    variant === PageSectionLayoutTypes.Grid2x2 &&
    css`
      @media ${device.tablet} {
        grid-template-columns: ${({ theme }) =>
          `repeat(auto-fit, minmax(calc(50% - ${theme.sizing.main}), 1fr))`};
      }
    `}

  ${({ variant }) =>
    variant === PageSectionLayoutTypes.Grid3x3 &&
    css`
      @media ${device.tablet} {
        grid-template-columns: ${({ theme }) =>
          `repeat(auto-fit, minmax(calc(33% - ${theme.sizing.main}), 1fr))`};
      }
    `}

  ${({ variant }) =>
    variant === PageSectionLayoutTypes.Grid4x4 &&
    css`
      @media ${device.tablet} {
        grid-template-columns: ${({ theme }) =>
          `repeat(auto-fit, minmax(calc(50% - ${theme.sizing.main}), 1fr))`};
      }

      @media ${device.laptop} {
        grid-template-columns: ${({ theme }) =>
          `repeat(auto-fit, minmax(calc(25% - ${theme.sizing.main}), 1fr))`};
      }
    `}

  ${({ variant }) =>
    variant === PageSectionLayoutTypes.LogoGrid4x4 &&
    css`
      grid-template-columns: ${({ theme }) =>
        `repeat(auto-fit, minmax(calc(50% - ${theme.sizing.main}), 1fr))`};

      @media ${device.laptop} {
        grid-template-columns: ${({ theme }) =>
          `repeat(auto-fit, minmax(calc(25% - ${theme.sizing.main}), 1fr))`};
      }
    `}

  ${({ variant }) =>
    variant === PageSectionLayoutTypes.Stacked &&
    css`
      grid-template-columns: 1fr !important;
    `}

  ${({ variant }) =>
    variant === PageSectionLayoutTypes.CardGrid &&
    css`
      @media ${device.laptop} {
        grid-template-columns: ${({ theme }) =>
          `repeat(auto-fit, minmax(calc(33% - ${theme.sizing.main}), 1fr))`};
      }
    `}

  ${({ variant }) =>
    variant === PageSectionLayoutTypes.StackedNoGridGap &&
    css`
      display: block;
      grid-gap: 0;
      width: 100%;
    `}
`;

interface CardProps {
  isCarouselItem?: boolean;
  article?: boolean;
  noPadding?: boolean;
}

export const Card = styled.div<CardProps>`
  display: flex;
  flex-flow: column nowrap;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: ${({ theme }) => theme.sizing.main};
  width: 100%;
  overflow: hidden;

  ${({ noPadding }) =>
    noPadding &&
    css`
      padding: 0;
    `}

  ${({ isCarouselItem }) =>
    !isCarouselItem &&
    css`
      height: 100%;
    `}

  ${({ article }) =>
    article &&
    css`
      background-color: transparent;
      padding: 0;
    `}
`;

export const ErrorBlock = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10em 2em;
  font-weight: ${FontWeight.Light};
  height: 100%;
  color: black;

  > * {
    margin: auto;
  }
`;
