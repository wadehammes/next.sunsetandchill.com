import { FC, useState } from "react";
import styled, { css } from "styled-components";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { ComponentRenderer } from "src/components/ComponentRenderer/ComponentRenderer.component";
import { Container, Grid } from "src/components/Layout";
import {
  contentfulColorMapping,
  darkBackgrounds,
  device,
  hasDarkBackground,
} from "src/styles/theme";
import { A, Bold, H1, H2, H3, makeComponent } from "src/components/Typography";
import {
  PageSectionLayoutTypes,
  PageSectionMediaTypes,
  PageSectionType,
  SectionContentPadding,
  SectionSize,
} from "src/components/PageSection/PageSection.interfaces";
import {
  Alignment,
  BackgroundPositioning,
  BackgroundSizing,
  ContentfulColors,
  Entry,
  GridAlignment,
  Languages,
} from "src/interfaces/common.interfaces";
import { ButtonSizes } from "src/components/Button/Button.interfaces";
import { appendUrlParams, convertRelativeUrl } from "src/utils/helpers";
import { useQueryParamString } from "src/hooks/useQueryParamString";
import { useWindowDimensions } from "src/hooks/useWindowDimensions";

const CTA = dynamic(() => import("src/components/CTA/CTA.component"));

const LottieFile = dynamic(() =>
  import("src/components/LottieFile/LottieFile.component"),
);

const VideoPlayer = dynamic(() =>
  import("src/components/VideoPlayer/VideoPlayer.component"),
);

interface PageSectionProps {
  readonly fields: PageSectionType;
  fullHeight?: boolean;
}

const handleSectionHeaderAlignment = (align: Alignment) => {
  switch (align) {
    case Alignment.Left:
      return "start";
    case Alignment.Center:
      return Alignment.Center.toLowerCase();
    case Alignment.Right:
      return "end";
    default:
      return Alignment.Center;
  }
};

interface PageSectionStyleProps {
  backgroundImage?: string;
  backgroundImagePosition?: BackgroundPositioning;
  backgroundImagePadding?: number;
  backgroundImageSizing?: BackgroundSizing;
  backgroundColor?: ContentfulColors;
  hasSectionContent?: boolean;
  mediaType?: PageSectionMediaTypes;
  fullHeight?: boolean;
  size?: SectionSize;
  windowWidth?: number;
}

const PageSectionWrapper = styled.div<PageSectionStyleProps>`
  position: relative;
  padding: ${({ theme }) => theme.sizing.sections.mobile};
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor
      ? contentfulColorMapping[backgroundColor]
      : theme.colors.white};
  z-index: 1;
  margin-bottom: -1px;
  overflow: hidden;

  ${({ fullHeight }) =>
    fullHeight &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      > * {
        margin: auto;
      }
    `}

  ${({ backgroundColor, theme }) =>
    backgroundColor === ContentfulColors.PurpleGradient &&
    css`
      background-image: ${theme.colors.purpleGradient};
    `}

  ${({ backgroundColor, theme }) =>
    backgroundColor === ContentfulColors.PurpleGradientReversed &&
    css`
      background-image: ${theme.colors.purpleGradientReversed};
    `}

  ${({ backgroundColor, theme }) =>
    backgroundColor === ContentfulColors.GreyPurpleGradient &&
    css`
      background-image: linear-gradient(
        ${contentfulColorMapping[backgroundColor]} 80%,
        ${theme.colors.primary.dark} 80%
      );
    `}

  ${({ backgroundColor, theme }) =>
    backgroundColor === ContentfulColors.LightPurpleWhiteGradient &&
    css`
      background-image: linear-gradient(
        ${contentfulColorMapping[backgroundColor]} 80%,
        ${theme.colors.white} 80%
      );
    `}

  ${({ backgroundColor, theme }) =>
    backgroundColor === ContentfulColors.WhiteLightPurpleGradient &&
    css`
      background-image: linear-gradient(
        ${contentfulColorMapping[backgroundColor]} 80%,
        ${theme.colors.purple.light} 80%
      );
    `}

  ${({ backgroundColor, theme }) =>
    (backgroundColor === ContentfulColors.PurpleNeonPurpleGradient ||
      backgroundColor === ContentfulColors.LightPurpleNeonPurpleGradient) &&
    css`
      background-image: linear-gradient(
        ${contentfulColorMapping[backgroundColor]} 75%,
        ${theme.colors.purple.variants.neon} 75%
      );
    `}

  @media ${device.laptop} {
    padding: ${({ theme }) => theme.sizing.sections.laptop};
  }

  ${({
    backgroundImage,
    backgroundImagePosition,
    backgroundImagePadding,
    backgroundImageSizing,
    windowWidth,
    theme,
  }) =>
    backgroundImage &&
    css`
      background-image: url(${`${backgroundImage}?w=${windowWidth}`});
      background-size: ${backgroundImageSizing?.toLowerCase()};
      background-repeat: no-repeat;
      background-position: ${backgroundImagePosition?.toLowerCase()} center;
      padding: ${backgroundImagePadding
        ? `5em 0 ${backgroundImagePadding}em`
        : theme.sizing.sections.mobile};

      @media ${device.laptop} {
        padding: ${theme.sizing.sections.laptop};
      }
    `}

  ${({ size }) =>
    size === SectionSize.NoTopPadding &&
    css`
      padding-top: 1em !important;
    `}

  ${({ size }) =>
    size === SectionSize.NoPadding &&
    css`
      padding-top: 1.5em !important;
      padding-bottom: 2.5em !important;
    `}

  ${({ hasSectionContent, mediaType }) =>
    !hasSectionContent &&
    mediaType === PageSectionMediaTypes.FullWidth &&
    css`
      padding-bottom: 0 !important;
    `}
`;

interface PageSectionHeaderSeparatorProps {
  hasSectionContent?: boolean;
  mediaType?: PageSectionMediaTypes;
}

const PageSectionHeaderSeparator = styled.div<PageSectionHeaderSeparatorProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `0 ${theme.sizing.main} ${theme.sizing.main}`};

  @media ${device.laptop} {
    padding: 0 0 ${({ theme }) => theme.sizing.large} 0;
  }

  ${({ hasSectionContent, mediaType }) =>
    !hasSectionContent &&
    mediaType === PageSectionMediaTypes.FullWidth &&
    css`
      padding-bottom: 0 !important;
      margin: 0 auto;
      justify-content: flex-start;
    `}
`;

interface PageSectionHeaderProps {
  align?: Alignment;
  hasSectionContent?: boolean;
  sectionWidth?: SectionSize;
  contentPadding?: SectionContentPadding;
}

export const PageSectionHeader = styled.div<PageSectionHeaderProps>`
  display: grid;
  grid-gap: ${({ theme }) => theme.sizing.main};
  position: relative;
  z-index: 1;
  max-width: 100ch;
  width: 100%;

  ${H3} {
    max-width: 75ch;
    margin: 0 auto;
  }

  ${A} {
    text-decoration: underline;
  }

  ${({ align }) =>
    align &&
    align === Alignment.Center &&
    css`
      text-align: center;
      margin: 0 auto;
    `}

  ${({ align }) =>
    align &&
    align === Alignment.Right &&
    css`
      text-align: right;
    `}

  > * {
    justify-self: ${({ align }) =>
      align ? handleSectionHeaderAlignment(align) : Alignment.Center};
  }

  + ${Grid} {
    padding: ${({ theme, hasSectionContent }) =>
        hasSectionContent ? theme.sizing.large : 0}
      0 0 0;
  }

  + ${PageSectionHeaderSeparator} {
    padding-top: ${({ theme }) => theme.sizing.main};

    @media ${device.tablet} {
      padding-top: ${({ theme }) => theme.sizing.large};
    }
  }

  ${({ contentPadding }) =>
    contentPadding === SectionContentPadding.NoPadding &&
    css`
      + ${Grid} {
        padding: 0;
      }
    `}

  ${({ sectionWidth }) =>
    sectionWidth === SectionSize.FullWidth &&
    css`
      padding: 0 ${({ theme }) => theme.sizing.main};
    `}
`;

interface MediaProps {
  mediaHeight?: number;
  mediaWidth?: number;
  mediaType?: PageSectionMediaTypes;
}

const PageSectionSvg = styled.div<MediaProps>`
  ${({ mediaWidth = 0, mediaHeight = 0, mediaType }) =>
    mediaType === PageSectionMediaTypes.FullWidth &&
    css`
      display: flex;
      text-align: center;
      position: relative;
      left: 50%;
      margin-left: ${({ theme }) => `calc(-${theme.sizing.container} / 2)`};
      font-size: 8px;
      width: ${({ theme }) => theme.sizing.container};
      min-height: 24em;

      img {
        width: ${`${mediaWidth / 16}em`} !important;
        min-width: ${`${mediaWidth / 16}em`} !important;
        height: ${`${mediaHeight / 16}em`} !important;
        min-height: ${`${mediaHeight / 16}em`} !important;
        max-width: auto !important;
      }

      @media ${device.tablet} {
        font-size: 13px;
      }

      @media ${device.laptop} and ${device.tabletVert} {
        font-size: 13px;
      }

      @media ${device.laptop} and ${device.laptopVert} {
        font-size: 16px;
      }
    `}
`;

interface HeaderProps {
  backgroundColor: ContentfulColors;
}

const Header = styled.header<HeaderProps>`
  color: inherit;

  + ${PageSectionHeaderSeparator} {
    padding-top: ${({ theme }) => theme.sizing.main};

    @media ${device.laptop} {
      padding-top: ${({ theme }) => theme.sizing.large};
    }
  }

  ${({ backgroundColor, theme }) =>
    darkBackgrounds.includes(backgroundColor) &&
    css`
      color: ${theme.colors.white};
    `}
`;

const SectionEndCta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2.75rem 0 0 0;
`;

const PageSectionHeaderMediaAbove = styled.div`
  text-align: center;
  padding: 0 ${({ theme }) => `${theme.sizing.large} ${theme.sizing.main}`};
`;

export const PageSection: FC<PageSectionProps> = ({ fields, fullHeight }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
  });
  const { locale } = useRouter();
  const { width } = useWindowDimensions();
  const { queryParamString } = useQueryParamString();
  const [hasSectionContent] = useState<boolean>(
    Boolean(fields?.sectionContent?.length) || Boolean(fields?.sectionVideo),
  );
  const [isDarkBackground] = useState<boolean>(
    hasDarkBackground(fields?.sectionBackgroundColor),
  );

  const pageSectionHeaderParsing: Options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <H1
          color={
            isDarkBackground
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
            isDarkBackground
              ? ContentfulColors.White
              : ContentfulColors.HeadlinePurple
          }
        >
          {children}
        </H2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <H2
          as={makeComponent("h3")}
          color={
            isDarkBackground
              ? ContentfulColors.White
              : ContentfulColors.HeadlinePurple
          }
        >
          {children}
        </H2>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <H3
          as={makeComponent("p")}
          color={
            isDarkBackground
              ? ContentfulColors.White
              : ContentfulColors.DarkPurple
          }
          style={{ padding: "1.25em 0 0.75em" }}
        >
          {children}
        </H3>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <A
          href={appendUrlParams(node.data.uri, queryParamString)}
          color={
            isDarkBackground ? ContentfulColors.White : ContentfulColors.Purple
          }
        >
          {children}
        </A>
      ),
    },
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderText: (text: string) =>
      text.split("\n").flatMap((t, i) => [i > 0 && <br key={i} />, t]),
  };

  return (
    fields && (
      <PageSectionWrapper
        ref={ref}
        id={fields.sectionId}
        backgroundImage={convertRelativeUrl(
          fields?.sectionBackgroundImage?.file?.url?.en,
        )}
        backgroundImagePosition={fields.sectionBackgroundImagePositioning}
        backgroundImagePadding={fields?.sectionBackgroundImagePadding ?? 0}
        backgroundImageSizing={
          fields?.sectionBackgroundImageSizing ?? BackgroundSizing.Contain
        }
        backgroundColor={fields.sectionBackgroundColor}
        hasSectionContent={hasSectionContent}
        mediaType={fields.sectionHeaderMediaStyle}
        fullHeight={fullHeight}
        size={fields.sectionSize}
        windowWidth={
          fields?.sectionBackgroundImageSizing === BackgroundSizing.Contain
            ? width ?? 2560
            : 2560
        }
      >
        <Container sectionWidth={fields.sectionWidth}>
          {fields?.sectionHeaderMediaAbove && (
            <PageSectionHeaderMediaAbove>
              <Image
                src={convertRelativeUrl(
                  fields.sectionHeaderMediaAbove.file.url[locale as Languages],
                )}
                height={
                  fields.sectionHeaderMediaAbove.file.details.image.height[
                    locale as Languages
                  ] / 2
                }
                width={
                  fields.sectionHeaderMediaAbove.file.details.image.width[
                    locale as Languages
                  ] / 2
                }
                alt=""
                role="presentation"
                quality={100}
              />
            </PageSectionHeaderMediaAbove>
          )}
          {fields.sectionHeader?.en && (
            <PageSectionHeader
              align={fields.sectionHeaderAlignment}
              hasSectionContent={hasSectionContent}
              sectionWidth={fields.sectionWidth}
              contentPadding={fields.sectionContentLayoutPadding}
            >
              <Header backgroundColor={fields.sectionBackgroundColor}>
                {documentToReactComponents(
                  fields.sectionHeader[locale as Languages],
                  pageSectionHeaderParsing,
                )}
              </Header>
              {fields?.sectionHeaderCta && (
                <CTA
                  cta={fields.sectionHeaderCta}
                  lightVariant={Boolean(isDarkBackground)}
                  size={ButtonSizes.Large}
                />
              )}
            </PageSectionHeader>
          )}
          {fields.sectionHeaderMediaSeparator && (
            <PageSectionHeaderSeparator
              hasSectionContent={hasSectionContent}
              mediaType={fields.sectionHeaderMediaStyle}
            >
              <PageSectionSvg
                mediaWidth={
                  fields.sectionHeaderMediaSeparator.file.details.image.width[
                    locale as Languages
                  ]
                }
                mediaHeight={
                  fields.sectionHeaderMediaSeparator.file.details.image.height[
                    locale as Languages
                  ]
                }
                mediaType={fields.sectionHeaderMediaStyle}
              >
                <Image
                  src={convertRelativeUrl(
                    fields.sectionHeaderMediaSeparator.file.url[
                      locale as Languages
                    ],
                  )}
                  height={
                    fields.sectionHeaderMediaSeparator.file.details.image
                      .height[locale as Languages]
                  }
                  width={
                    fields.sectionHeaderMediaSeparator.file.details.image.width[
                      locale as Languages
                    ]
                  }
                  alt=""
                  role="presentation"
                />
              </PageSectionSvg>
            </PageSectionHeaderSeparator>
          )}
          {fields?.sectionVideo && (
            <Grid variant={PageSectionLayoutTypes.Stacked}>
              <VideoPlayer url={fields.sectionVideo} noMargin />
            </Grid>
          )}
          {Boolean(fields?.sectionContent?.length) && (
            <Grid
              variant={fields.sectionContentLayout}
              gridAlignment={
                fields?.sectionContentLayoutGridAlignment ??
                GridAlignment.Stretched
              }
            >
              {fields.sectionContent.map((content: Entry, index: number) => (
                <ComponentRenderer
                  key={content.id}
                  section={fields}
                  content={content}
                  index={index}
                  inView={inView}
                />
              ))}
            </Grid>
          )}
          {fields?.sectionCta && (
            <SectionEndCta>
              <CTA
                cta={fields.sectionCta}
                lightVariant={Boolean(isDarkBackground)}
              />
            </SectionEndCta>
          )}
          {fields?.sectionHeaderLottie && (
            <PageSectionSvg mediaType={PageSectionMediaTypes.FullWidth}>
              <LottieFile
                height={fields?.sectionHeaderLottieHeight}
                width={fields?.sectionHeaderLottieWidth}
                path={fields?.sectionHeaderLottie.file.url[locale as Languages]}
              />
            </PageSectionSvg>
          )}
        </Container>
      </PageSectionWrapper>
    )
  );
};

export default PageSection;
