import { FC, ReactElement } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { device } from "src/styles/theme";
import styled, { css } from "styled-components";
import { Alignment, Entry } from "src/interfaces/common.interfaces";
import { SectionDoubleWideType } from "src/components/PageDoubleSection/PageDoubleSection.interfaces";
import { PageSectionLayoutTypes } from "src/components/PageSection/PageSection.interfaces";
import { AnimatedWrapperProps } from "src/components/AnimatedWrapper/AnimatedWrapper.interfaces";

const PageSection = dynamic(() =>
  import("src/components/PageSection/PageSection.component"),
);

interface PageDoubleSectionProps {
  entry: SectionDoubleWideType;
}

const DoubleSection = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  align-items: stretch;
  align-content: center;
  grid-gap: 0;
  min-height: 20em;

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Wrapper = styled.div<AnimatedWrapperProps>`
  opacity: 1;
  transition: all 0.5s ease-in-out;

  &:first-of-type {
    transform: translateX(0%);
  }

  &:last-of-type {
    transform: translateX(0);
  }

  @media ${device.tablet} {
    &:first-of-type {
      transform: translateX(-90%);
    }

    &:last-of-type {
      transform: translateX(90%);
    }
  }

  ${({ animate }) =>
    animate &&
    css`
      opacity: 1;
      &:first-of-type,
      &:last-of-type {
        transform: translateX(0);
      }
    `}
`;

export const PageDoubleSection: FC<PageDoubleSectionProps> = ({
  entry,
}): ReactElement => {
  const { inView, ref } = useInView({
    triggerOnce: true,
  });

  return (
    entry && (
      <DoubleSection>
        {entry?.sections?.map((section: Entry) => {
          const normalizedDoubleSectionContent = {
            id: section.id,
            ...section.fields,
            sectionBackgroundColor: section.fields.sectionBackgroundColor.en,
            sectionHeaderAlignment:
              section.fields?.sectionHeaderAlignment?.en ?? Alignment.Center,
            sectionContentLayout:
              section.fields?.sectionContentLayout?.en ??
              PageSectionLayoutTypes.Stacked,
            sectionContent: section.fields.sectionContent?.en.map(
              (content: Entry) => ({
                id: content.sys.id,
                type: content.sys.contentType.sys.id,
                fields: content.fields,
              }),
            ),
          };

          return (
            <Wrapper
              ref={ref}
              key={normalizedDoubleSectionContent.id}
              animate={inView}
            >
              <PageSection fields={normalizedDoubleSectionContent} fullHeight />
            </Wrapper>
          );
        })}
      </DoubleSection>
    )
  );
};

export default PageDoubleSection;
