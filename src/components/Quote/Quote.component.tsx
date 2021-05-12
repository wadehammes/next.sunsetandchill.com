import { FC } from "react";
import { QuoteType } from "src/components/Quote/Quote.interfaces";
import {
  Languages,
  ContentfulColors,
  Alignment,
  FontStyle,
} from "src/interfaces/common.interfaces";
import styled, { css } from "styled-components";
import { P } from "src/components/Typography";
import { useRouter } from "next/router";
import { device, contentfulColorMapping } from "src/styles/theme";
import Head from "next/head";

interface QuoteContainerProps {
  align: Alignment;
}

const QuoteContainer = styled.div<QuoteContainerProps>`
  text-align: ${({ align }) => align};
  position: relative;
`;

interface QuotesProps {
  iconColor: ContentfulColors;
}

const Quotes = styled.div<QuotesProps>`
  &:before,
  &:after {
    content: "“";
    font-family: "Rosario", sans-serif;
    color: ${({ iconColor = ContentfulColors.Purple }) =>
      contentfulColorMapping[iconColor]};
    font-size: 6rem;
    position: absolute;

    @media ${device.tablet} {
      font-size: 10rem;
    }
  }

  &:before {
    top: -0.5rem;
    left: 0;

    @media ${device.tablet} {
      top: -2rem;
    }
  }

  &:after {
    transform: rotate(180deg) translateY(2rem);
    right: 1rem;
    bottom: 1.5rem;

    @media ${device.tablet} {
      bottom: 0;
    }
  }
`;

interface QuoteTextProps {
  fontStyle: FontStyle;
}

const QuoteText = styled(P)<QuoteTextProps>`
  font-size: 1.5em;
  padding: 0 2em;
  position: relative;
  text-align: inherit;

  ${({ fontStyle }) =>
    fontStyle === FontStyle.Italics &&
    css`
      font-style: italic;
    `}

  @media ${device.tablet} {
    font-size: 1.75em;
    padding: 0 3em;
  }
`;

interface QuoteProps {
  fields: QuoteType;
  lightVariant?: boolean;
}

export const Quote: FC<QuoteProps> = ({ fields, lightVariant = false }) => {
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rosario:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <QuoteContainer align={fields.align}>
        <Quotes iconColor={fields.quoteIconColor}>
          <QuoteText
            color={
              lightVariant
                ? ContentfulColors.White
                : ContentfulColors.DarkPurple
            }
            fontStyle={fields.quoteFontStyle}
          >
            {fields.quote[locale as Languages]}
          </QuoteText>
          <QuoteText
            color={
              lightVariant
                ? ContentfulColors.White
                : ContentfulColors.DarkPurple
            }
            fontStyle={FontStyle.Normal}
          >
            &mdash; {fields.quotee}
          </QuoteText>
        </Quotes>
      </QuoteContainer>
    </>
  );
};

export default Quote;
