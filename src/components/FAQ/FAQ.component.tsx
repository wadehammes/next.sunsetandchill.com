import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { FC } from "react";
import {
  ContentfulColors,
  Entry,
  Languages,
} from "src/interfaces/common.interfaces";
import { Accordion } from "src/components/Accordion/Accordion.component";
import { A, Bold, H1, H2, H3, P } from "src/components/Typography";
import { FAQItem } from "src/components/FAQ/FAQ.interfaces";
import styled from "styled-components";
import { contentfulColorMapping } from "src/styles/theme";

const borderWidth = "2px";
const borderColor = ContentfulColors.LightPurple;

interface FAQProps {
  data: Entry;
  lightVariant?: boolean;
}

const FAQWrapper = styled.div`
  width: 100%;
  border-top: ${borderWidth} solid ${contentfulColorMapping[borderColor]};
`;

export const FAQ: FC<FAQProps> = ({ data, lightVariant }) => {
  const { locale } = useRouter();

  const faqBodyParsing: Options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <H1
          color={
            lightVariant
              ? ContentfulColors.White
              : ContentfulColors.HeadlinePurple
          }
        >
          {children}
        </H1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <H2
          color={
            lightVariant
              ? ContentfulColors.White
              : ContentfulColors.HeadlinePurple
          }
        >
          {children}
        </H2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <H3
          color={
            lightVariant
              ? ContentfulColors.White
              : ContentfulColors.HeadlinePurple
          }
        >
          {children}
        </H3>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <P color={lightVariant ? ContentfulColors.White : undefined}>
          {children}
        </P>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <A
          href={node.data.uri}
          rel="noreferrer"
          target="_blank"
          color={
            lightVariant ? ContentfulColors.LogoPurple : ContentfulColors.Purple
          }
        >
          {children}
        </A>
      ),
    },
  };

  return (
    <FAQWrapper>
      {data?.faqItems.length &&
        data.faqItems.map((item: FAQItem, index: number) => (
          <Accordion
            key={item.faqTitle.en}
            borderWidth={borderWidth}
            borderColor={borderColor}
            activeColor={ContentfulColors.NeonPurple}
            parentItem={
              <P style={{ color: "inherit" }}>
                <Bold>{item.faqTitle[locale as Languages]}</Bold>
              </P>
            }
            accordionId={`faq-${index}`}
            accordionLabel={item.faqTitle[locale as Languages]}
          >
            {documentToReactComponents(
              item.faqBody[locale as Languages],
              faqBodyParsing,
            )}
          </Accordion>
        ))}
    </FAQWrapper>
  );
};

export default FAQ;
