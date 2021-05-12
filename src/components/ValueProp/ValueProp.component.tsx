import { FC, useEffect, useState } from "react";
import { H3, Bold, P, A } from "src/components/Typography";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Card } from "src/components/Layout";
import styled, { css } from "styled-components";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { device, hasDarkBackground } from "src/styles/theme";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Alignment,
  ContentfulColors,
  ContentStyleTypes,
  Languages,
} from "src/interfaces/common.interfaces";
import { ValuePropType } from "src/components/ValueProp/ValueProp.interfaces";
import { PageSectionLayoutTypes } from "src/components/PageSection/PageSection.interfaces";
import { LottieFile } from "src/components/LottieFile/LottieFile.component";
import { normalizedCta } from "src/components/CTA/CTA.normalizer";
import { CTA } from "src/components/CTA/CTA.component";
import { convertRelativeUrl, appendUrlParams } from "src/utils/helpers";
import { ButtonSizes } from "src/components/Button/Button.interfaces";
import { AnimatedWrapperProps } from "src/components/AnimatedWrapper/AnimatedWrapper.interfaces";
import { AnimatedWrapper } from "src/components/AnimatedWrapper/AnimatedWrapper.component";
import { useQueryParamString } from "src/hooks/useQueryParamString";
import { RhythmLink } from "src/components/RhythmLink/RhythmLink.component";

interface ValuePropLayout {
  layout?: PageSectionLayoutTypes;
}

interface ValuePropProps extends AnimatedWrapperProps, ValuePropLayout {
  valueProp: ValuePropType;
  backgroundColor?: ContentfulColors;
  inView: boolean;
}

interface WrapperProps extends ValuePropLayout {
  alignment: Alignment;
  valuePropStyle: ContentStyleTypes;
}

interface IconProps {
  alignment: Alignment;
}

const handleAlignment = (align: Alignment | string) => {
  switch (align) {
    case Alignment.Left:
      return "flex-start";
    case Alignment.Center:
      return "center";
    case Alignment.Right:
      return "flex-end";
    default:
      return "flex-start";
  }
};

const Icon = styled.div<IconProps>`
  display: flex;
  align-items: flex-end;
  justify-content: ${({ alignment }) => handleAlignment(alignment)};
  margin: 0 0 ${({ theme }) => theme.sizing.main} 0;
  width: 100%;
  min-height: 6em;

  > div {
    @media screen and (max-width: 280px) {
      max-width: 100%;
      width: 100% !important;
      height: auto !important;
    }
  }
`;

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  text-align: left;
  justify-content: ${({ alignment }) => handleAlignment(alignment)};
  height: 100%;

  ${({ alignment }) =>
    alignment === Alignment.Right &&
    css`
      text-align: right;
    `}

  ${({ alignment }) =>
    alignment === Alignment.Center &&
    css`
      align-items: center;
      text-align: center;

      @media ${device.laptop} {
        align-items: center;
      }
    `}

  ${({ valuePropStyle, layout }) =>
    valuePropStyle === ContentStyleTypes.Card &&
    css`
      padding: 0;
    `}
  
  ${({ valuePropStyle, layout }) =>
    valuePropStyle === ContentStyleTypes.Card &&
    layout === PageSectionLayoutTypes.CardGrid &&
    css`
      ${Icon} {
        width: auto;
      }

      @media ${device.tablet} {
        flex-flow: row nowrap;
        align-items: center;
      }

      @media ${device.laptop} {
        flex-flow: column nowrap;
        align-items: flex-start;
      }

      ${Icon} {
        @media ${device.tablet} {
          margin: 0 ${({ theme }) => theme.sizing.main} 0 0;
        }

        @media ${device.laptop} {
          margin: 0 0 ${({ theme }) => theme.sizing.main} 0;
        }
      }
    `}

  ${({ valuePropStyle, theme }) =>
    (valuePropStyle === ContentStyleTypes.Outlined ||
      valuePropStyle === ContentStyleTypes.DarkOutlined) &&
    css`
      border: 2px solid transparent;
      border-radius: ${theme.borderRadius.card};
      padding: ${theme.sizing.main};
      overflow: hidden;
      height: 100%;

      @media ${device.tablet} {
        padding: ${theme.sizing.main} ${theme.sizing.large};
      }
    `}

  ${({ valuePropStyle, theme }) =>
    valuePropStyle === ContentStyleTypes.Outlined &&
    css`
      border-color: ${theme.colors.logo};
      box-shadow: 0 0 10px ${theme.colors.logo},
        inset 0 0 10px ${theme.colors.logo};
    `}

  ${({ valuePropStyle, theme }) =>
    valuePropStyle === ContentStyleTypes.DarkOutlined &&
    css`
      border-color: ${theme.colors.purple.variants.neon};
      box-shadow: 0 0 10px ${theme.colors.purple.variants.neon},
        inset 0 0 10px ${theme.colors.purple.variants.neon};
    `}
`;

const Copy = styled.div`
  display: grid;
  align-content: baseline;
  grid-gap: ${({ theme }) => theme.sizing.small};
  flex: 1;
`;

const ContentCardP = styled(P)`
  font-size: ${({ theme }) => theme.font.contentCard.copy.mobile};
  font-weight: ${({ theme }) => theme.font.contentCard.copy.fontWeight};
  letter-spacing: ${({ theme }) => theme.font.contentCard.copy.letterSpacing};
  line-height: ${({ theme }) => theme.font.contentCard.copy.lineHeight};
`;

const CTAWrapper = styled.div`
  padding: ${({ theme }) => theme.sizing.main} 0 0 0;
`;

export const ValueProp: FC<ValuePropProps> = ({
  valueProp,
  wait,
  layout,
  backgroundColor,
  inView = false,
}) => {
  const [lottiePlaying, setLottiePlaying] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { locale } = useRouter();
  const { queryParamString } = useQueryParamString();

  useEffect(() => {
    const handleWindowWidth = () => {
      const ww: number = window.outerWidth;

      setWindowWidth(ww);

      if (ww <= 768 && inView) {
        setLottiePlaying(true);
      }
    };

    handleWindowWidth();

    window.addEventListener("resize", handleWindowWidth);

    return () => window.removeEventListener("resize", handleWindowWidth);
  }, [inView]);

  const isDarkBackground = backgroundColor
    ? hasDarkBackground(backgroundColor)
    : null;

  const cta = valueProp?.cta ? normalizedCta(valueProp?.cta?.en) : null;

  const valuePropContentParsing: Options = {
    renderNode: {
      [BLOCKS.HEADING_3]: (node, children) => (
        <H3
          color={
            isDarkBackground &&
            valueProp &&
            valueProp.style !== ContentStyleTypes.Card
              ? ContentfulColors.White
              : ContentfulColors.DarkPurple
          }
        >
          <Bold>{children}</Bold>
        </H3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <H3
          as="h4"
          color={
            isDarkBackground &&
            valueProp &&
            valueProp.style !== ContentStyleTypes.Card
              ? ContentfulColors.White
              : ContentfulColors.DarkPurple
          }
        >
          <Bold>{children}</Bold>
        </H3>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <ContentCardP
          color={
            isDarkBackground &&
            valueProp &&
            valueProp.style !== ContentStyleTypes.Card
              ? ContentfulColors.White
              : ContentfulColors.DarkPurple
          }
        >
          {children}
        </ContentCardP>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <RhythmLink
          href={appendUrlParams(node.data.uri, queryParamString)}
          passHref
        >
          <A
            style={{ textDecoration: "underline" }}
            color={
              isDarkBackground &&
              valueProp &&
              valueProp.style !== ContentStyleTypes.Card
                ? ContentfulColors.White
                : ContentfulColors.DarkPurple
            }
          >
            {children}
          </A>
        </RhythmLink>
      ),
    },
  };

  const inner = valueProp && (
    <Wrapper
      alignment={valueProp.alignment}
      valuePropStyle={valueProp.style}
      layout={layout}
      onMouseEnter={() => setLottiePlaying(true)}
    >
      {valueProp?.icon && !valueProp?.iconLottieFile && (
        <Icon alignment={valueProp.alignment}>
          <Image
            src={`https:${valueProp.icon.file.url[locale as Languages]}`}
            width={valueProp.icon.file.details.image.width[locale as Languages]}
            height={
              valueProp.icon.file.details.image.height[locale as Languages]
            }
            alt={valueProp.icon?.title[locale as Languages] ?? ""}
            loading="lazy"
          />
        </Icon>
      )}
      {valueProp?.iconLottieFile && (
        <Icon alignment={valueProp.alignment}>
          <LottieFile
            play={lottiePlaying}
            height={256}
            width={256}
            path={convertRelativeUrl(
              valueProp.iconLottieFile.file.url[locale as Languages],
            )}
            onLoopComplete={() => setLottiePlaying(Boolean(windowWidth <= 768))}
          />
        </Icon>
      )}
      <Copy>
        {documentToReactComponents(
          valueProp.copy[locale as Languages],
          valuePropContentParsing,
        )}
      </Copy>
      {cta && (
        <CTAWrapper>
          <CTA cta={cta} size={ButtonSizes.Small} />
        </CTAWrapper>
      )}
    </Wrapper>
  );

  return valueProp && valueProp.style === ContentStyleTypes.Card ? (
    <AnimatedWrapper wait={wait} animate={inView}>
      <Card>{inner}</Card>
    </AnimatedWrapper>
  ) : (
    <AnimatedWrapper wait={wait} animate={inView}>
      {inner}
    </AnimatedWrapper>
  );
};

export default ValueProp;
