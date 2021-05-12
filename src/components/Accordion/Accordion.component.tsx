import React, { FC, ReactNode, useState } from "react";
import { ContentfulColors } from "src/interfaces/common.interfaces";
import { ChevronDown } from "src/styles/icons/ChevronDown";
import { contentfulColorMapping, device } from "src/styles/theme";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import { NavParent } from "src/components/Navigation/NavItems.component";

interface AccordionWrapperProps {
  borderWidth?: string;
  borderColor?: ContentfulColors;
  lightVariant?: boolean;
}

const AccordionWrapper = styled.div<AccordionWrapperProps>`
  width: 100%;
  border-bottom: ${({ borderWidth }) => borderWidth || "1px"} solid
    ${({ theme, borderColor }) =>
      borderColor
        ? contentfulColorMapping[borderColor]
        : rgba(theme.colors.buttons.primary.main, 0.25)};
`;

interface AccordionBodyProps {
  visible?: boolean;
  lightVariant?: boolean;
}

const AccordionBody = styled.div<AccordionBodyProps>`
  color: ${({ theme, lightVariant }) =>
    lightVariant ? theme.colors.white : theme.colors.purple.dark};
  display: none;
  padding: ${({ theme }) => `0 0 ${theme.sizing.main} 0`};

  @media ${device.tablet} {
    padding: ${({ theme }) => `0 0 ${theme.sizing.main} ${theme.sizing.main}`};
  }

  ${({ visible }) =>
    visible &&
    css`
      display: block;
    `}
`;

interface AccordionParentItemProps {
  listToggled?: boolean;
  lightVariant?: boolean;
  activeColor: ContentfulColors;
}

const AccordionParentItem = styled.span<AccordionParentItemProps>`
  color: ${({ theme, lightVariant }) =>
    lightVariant ? theme.colors.white : theme.colors.purple.main};
  display: block;
  text-align: left;
  padding-right: 1.5em;

  ${({ listToggled, activeColor }) =>
    listToggled &&
    css`
      color: ${contentfulColorMapping[activeColor]};
    `}
`;

interface AccordionToggleIconProps {
  bodyVisible?: boolean;
  lightVariant?: boolean;
  activeColor: ContentfulColors;
}

const AccordionToggleIcon = styled.span<AccordionToggleIconProps>`
  flex: 1;
  text-align: right;

  svg {
    stroke: ${({ theme, lightVariant }) =>
      lightVariant ? theme.colors.white : theme.colors.purple.main};
    transform: rotate(0);
    transform-origin: center;
    transition: transform 0.25s ease-in-out;
  }

  ${({ bodyVisible, activeColor }) =>
    bodyVisible &&
    css`
      svg {
        stroke: ${contentfulColorMapping[activeColor]};
        transform: rotate(180deg);
      }
    `}
`;

interface AccordionToggleProps {
  activeColor?: ContentfulColors;
}

const AccordionToggle = styled.button<AccordionToggleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  overflow: hidden;
  --webkit-appearance: none;
  border: 0;
  background: 0;
  padding: 1.5em 0;

  @media ${device.tablet} {
    padding: 1.5em ${({ theme }) => theme.sizing.main};
  }

  &:focus {
    outline: 0;

    ${AccordionParentItem} {
      ${({ activeColor }) =>
        activeColor &&
        css`
          color: ${contentfulColorMapping[activeColor]};
        `}
    }

    ${AccordionToggleIcon} {
      ${({ activeColor }) =>
        activeColor &&
        css`
          svg {
            stroke: ${contentfulColorMapping[activeColor]};
          }
        `}
    }
  }

  &:hover {
    cursor: pointer;

    ${NavParent} {
      color: ${({ theme }) => theme.colors.logo};
    }
  }
`;

interface AccordionProps extends AccordionWrapperProps {
  parentItem?: ReactNode;
  activeColor?: ContentfulColors;
  accordionId: string | number;
  accordionLabel: string;
}

export const Accordion: FC<AccordionProps> = ({
  children,
  activeColor = ContentfulColors.LogoPurple,
  borderWidth,
  borderColor,
  parentItem,
  lightVariant = false,
  accordionId = 0,
  accordionLabel = "",
}) => {
  const [bodyVisible, setBodyVisible] = useState<boolean>(false);

  return (
    <AccordionWrapper borderWidth={borderWidth} borderColor={borderColor}>
      {parentItem && (
        <AccordionToggle
          type="button"
          id={`accordion-${accordionId}`}
          aria-expanded={bodyVisible}
          aria-controls={`accordionBody-${accordionId}`}
          onClick={() => setBodyVisible(!bodyVisible)}
          data-testid={`accordion-${accordionId}`}
          activeColor={activeColor}
          aria-label={accordionLabel}
        >
          <AccordionParentItem
            activeColor={activeColor}
            lightVariant={lightVariant}
            listToggled={bodyVisible}
          >
            {parentItem}
          </AccordionParentItem>
          {children && (
            <AccordionToggleIcon
              activeColor={activeColor}
              lightVariant={lightVariant}
              bodyVisible={bodyVisible}
            >
              <ChevronDown aria-hidden="true" />
            </AccordionToggleIcon>
          )}
        </AccordionToggle>
      )}
      {children && (
        <AccordionBody
          id={`accordionBody-${accordionId}`}
          role="region"
          aria-labelledby={`accordion-${accordionId}`}
          lightVariant={lightVariant}
          visible={bodyVisible}
          data-testid={`accordionBody-${accordionId}`}
        >
          {children}
        </AccordionBody>
      )}
    </AccordionWrapper>
  );
};
