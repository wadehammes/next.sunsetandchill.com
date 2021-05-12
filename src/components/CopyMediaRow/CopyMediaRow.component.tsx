import { FC } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import styled, { css } from "styled-components";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import {
  contentfulColorMapping,
  device,
  hasDarkBackground,
} from "src/styles/theme";
import {
  Alignment,
  ContentStyleTypes,
  ContentfulColors,
  Languages,
  MediaFileType,
} from "src/interfaces/common.interfaces";
import {
  CopyMediaRowType,
  CopyPlacement,
  CopySpaceAllotment,
  MediaAlignment,
} from "src/components/CopyMediaRow/CopyMediaRow.interfaces";
import {
  Bold,
  H2,
  H3,
  H4,
  P,
  PrettyUL,
  PrettyLI,
  HR,
  A,
} from "src/components/Typography";
import { normalizedCta } from "src/components/CTA/CTA.normalizer";
import { appendUrlParams, convertRelativeUrl } from "src/utils/helpers";
import { AnimatedWrapperProps } from "src/components/AnimatedWrapper/AnimatedWrapper.interfaces";
import { useQueryParamString } from "src/hooks/useQueryParamString";
import { RhythmLink } from "src/components/RhythmLink/RhythmLink.component";
import { FontWeight } from "src/styles/enums/FontWeight.enum";

const CTA = dynamic(() => import("src/components/CTA/CTA.component"));

const Image = dynamic(() => import("next/image"));

const VideoElement = dynamic(() =>
  import("src/components/VideoElement/VideoElement.component"),
);

const LottieFile = dynamic(() =>
  import("src/components/LottieFile/LottieFile.component"),
);

interface ContentProps {
  placement?: CopyPlacement;
  alignment?: Alignment;
  flex?: CopySpaceAllotment;
  variant?: ContentStyleTypes;
}

interface AnimatedProps extends ContentProps, AnimatedWrapperProps {
  total?: number;
  variant?: ContentStyleTypes;
}

interface CopyMediaRowProps extends AnimatedProps {
  copyMediaRow: CopyMediaRowType;
  backgroundColor: ContentfulColors;
}

interface WrapperProps {
  alignItems?: MediaAlignment;
  variant?: ContentStyleTypes;
  backgroundColor?: ContentfulColors;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;

  @media ${device.tablet} {
    flex-flow: row nowrap;
    justify-content: flex-start;
  }

  ${({ variant }) =>
    variant === ContentStyleTypes.Outlined &&
    css`
      @media ${device.tablet} {
        flex-flow: column nowrap;
        justify-content: flex-start;
      }

      @media ${device.laptop} {
        flex-flow: row nowrap;
        justify-content: flex-start;
      }
    `}

  ${({ alignItems }) =>
    alignItems === "Top" &&
    css`
      align-items: flex-start;
    `}

  ${({ alignItems }) =>
    alignItems === "Bottom" &&
    css`
      align-items: flex-end;
    `}

  ${({ variant, theme, backgroundColor }) =>
    variant === ContentStyleTypes.Outlined &&
    css`
      position: relative;
      background: ${backgroundColor
        ? contentfulColorMapping[backgroundColor]
        : "transparent"};
      border: 2px solid ${theme.colors.logo};
      box-shadow: 0 0 10px ${theme.colors.logo},
        inset 0 0 10px ${theme.colors.logo};
      border-radius: ${theme.borderRadius.card};
      padding: ${theme.sizing.main};

      @media ${device.tablet} {
        padding: ${theme.sizing.large};
      }
    `}
`;

const AnimatedWrapper = styled.div<AnimatedProps>`
  opacity: 0;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in;
  transform: translateY(0);
  width: 100%;
  padding: 0 0 ${({ theme }) => theme.sizing.small} 0;
  position: relative;

  @media ${device.tablet} {
    padding: 0 0 ${({ theme }) => theme.sizing.large} 0;
    transform: translateY(1em);
  }

  ${({ placement }) =>
    placement === Alignment.Left &&
    css`
      @media ${device.laptop} {
        transform: translateX(-2em);
      }
    `}

  ${({ placement }) =>
    placement === Alignment.Right &&
    css`
      @media ${device.laptop} {
        transform: translateX(2em);
      }
    `}

  ${({ variant, theme, total = 0, index = 0 }) =>
    variant === ContentStyleTypes.Outlined &&
    css`
      z-index: ${total - index};
      transform: translateY(0) translateX(0) !important;
      margin-bottom: 0.5em;

      &:before {
        content: "";
        opacity: 0;
        height: 7.5em;
        width: 2px;
        background-color: ${theme.colors.logo};
        box-shadow: 0 0 8px ${theme.colors.logo},
          inset 0 0 8px ${theme.colors.logo};
        position: absolute;
        top: -7.5em;
        left: 50%;
        margin-left: -1px;
        transition: all 0.2s ease-in;
        transition-delay: 0.1s;
      }
    `}

  ${({ animate }) =>
    animate &&
    css`
      opacity: 1;
      transform: translateY(0);

      &:before {
        opacity: 1;
      }

      @media ${device.tablet} {
        transform: translateY(0);
      }

      @media ${device.laptop} {
        transform: translateX(0);
      }
    `}

  &:last-child {
    padding: 0;
  }
`;

const Copy = styled.div<ContentProps>`
  display: grid;
  grid-gap: ${({ theme }) => theme.sizing.small};
  text-align: ${({ alignment }) => (alignment ?? Alignment.Left).toLowerCase()};
  flex: 1;
  max-width: 100%;
  padding: 0;
  order: 1;
  margin-bottom: ${({ theme }) => theme.sizing.main};
  width: 100%;

  @media ${device.tablet} {
    margin-bottom: 0;
  }

  @media ${device.laptop} {
    flex: ${({ flex }) => flex};
  }

  ${({ placement, theme }) =>
    placement === Alignment.Left &&
    css`
      order: 1;

      @media ${device.tablet} {
        order: 0;
        padding-right: ${theme.sizing.large};
      }
    `}

  ${({ placement, theme }) =>
    placement === Alignment.Right &&
    css`
      order: 1;

      @media ${device.tablet} {
        padding-left: ${theme.sizing.large};
      }

      @media ${device.laptop} {
        padding-left: ${theme.sizing.large};
      }
    `};

  ${({ variant }) =>
    variant === ContentStyleTypes.Outlined &&
    css`
      order: 1;
    `}
`;

const CopyMediaRowH2 = styled(H2)`
  font-size: ${({ theme }) => theme.font.copyMediaRow.h2.mobile};
  font-weight: ${({ theme }) => theme.font.h2.fontWeight};
  line-height: ${({ theme }) => theme.font.h2.lineHeight};

  @media ${device.tablet} {
    font-size: ${({ theme }) => theme.font.copyMediaRow.h2.tablet};
  }
`;

const CopyMediaRowH3 = styled(H3)`
  font-size: ${({ theme }) => theme.font.copyMediaRow.h2.mobile};
  font-weight: ${({ theme }) => theme.font.h2.fontWeight};
  line-height: ${({ theme }) => theme.font.h2.lineHeight};
`;

const Media = styled.div<ContentProps>`
  flex: 1;
  order: 0;
  text-align: center;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.sizing.main};

  img {
    max-width: 100%;
    height: auto;
  }

  ${({ variant }) =>
    variant === ContentStyleTypes.Outlined &&
    css`
      order: 0;

      @media ${device.tablet} {
        text-align: left;
      }

      @media ${device.laptop} {
        text-align: center;
      }
    `}

  ${({ placement }) =>
    placement === Alignment.Right &&
    css`
      order: 0;
    `}
`;

export const CopyMediaRow: FC<CopyMediaRowProps> = ({
  copyMediaRow,
  backgroundColor = ContentfulColors.White,
  total = 0,
  index = 0,
}) => {
  const { locale } = useRouter();
  const { queryParamString } = useQueryParamString();

  const { inView, ref } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const isDarkBackground = backgroundColor
    ? hasDarkBackground(backgroundColor)
    : false;

  const copyMediaRowParsing: Options = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => (
        <CopyMediaRowH2
          color={
            isDarkBackground
              ? ContentfulColors.White
              : ContentfulColors.HeadlinePurple
          }
        >
          <Bold>{children}</Bold>
        </CopyMediaRowH2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <CopyMediaRowH3
          color={
            isDarkBackground
              ? ContentfulColors.White
              : ContentfulColors.HeadlinePurple
          }
        >
          <Bold>{children}</Bold>
        </CopyMediaRowH3>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <P
          color={
            isDarkBackground
              ? ContentfulColors.White
              : ContentfulColors.DarkPurple
          }
          style={{ margin: 0 }}
        >
          {children}
        </P>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <PrettyUL
          color={
            isDarkBackground
              ? ContentfulColors.White
              : ContentfulColors.DarkPurple
          }
        >
          {children}
        </PrettyUL>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => <PrettyLI>{children}</PrettyLI>,
      [BLOCKS.HR]: (node, children) => <HR />,
      [INLINES.HYPERLINK]: (node, children) => (
        <RhythmLink
          href={appendUrlParams(node.data.uri, queryParamString)}
          passHref
        >
          <A
            color={
              isDarkBackground
                ? ContentfulColors.White
                : ContentfulColors.DarkPurple
            }
            style={{ fontWeight: FontWeight.Semibold }}
            className="whiteLink"
          >
            {children}
          </A>
        </RhythmLink>
      ),
    },
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderText: (text: string) =>
      text.split("\n").flatMap((t, i) => [i > 0 && <br key={i} />, t]),
  };

  return (
    copyMediaRow && (
      <AnimatedWrapper
        ref={ref}
        animate={inView}
        variant={copyMediaRow.style}
        placement={copyMediaRow.copyPlacement}
        total={total}
        index={index}
      >
        <Wrapper
          alignItems={copyMediaRow.mediaAlignment}
          variant={copyMediaRow.style}
          backgroundColor={backgroundColor}
        >
          <Copy
            placement={copyMediaRow.copyPlacement}
            alignment={copyMediaRow.copyTextAlignment}
            flex={copyMediaRow.copySpaceAllotment}
            variant={copyMediaRow.style}
          >
            {copyMediaRow?.eyebrowCopy[locale as Languages] && (
              <H4 as="p" color={copyMediaRow.eyebrowColor}>
                {copyMediaRow.eyebrowCopy[locale as Languages]}
              </H4>
            )}
            {documentToReactComponents(
              copyMediaRow.copy[locale as Languages],
              copyMediaRowParsing,
            )}
            {copyMediaRow.copyCta && (
              <div>
                <CTA
                  cta={normalizedCta(copyMediaRow.copyCta)}
                  lightVariant={isDarkBackground}
                />
              </div>
            )}
          </Copy>
          {copyMediaRow?.media && !copyMediaRow.lottieFile && (
            <Media
              placement={copyMediaRow.copyPlacement}
              variant={copyMediaRow.style}
            >
              {copyMediaRow.mediaType === MediaFileType.Image && (
                <Image
                  src={convertRelativeUrl(
                    copyMediaRow.media.file.url[locale as Languages],
                  )}
                  width={
                    copyMediaRow.media.file.details.image.width[
                      locale as Languages
                    ]
                  }
                  height={
                    copyMediaRow.media.file.details.image.height[
                      locale as Languages
                    ]
                  }
                  alt={copyMediaRow.media?.title[locale as Languages] ?? ""}
                  loading="lazy"
                />
              )}
              {copyMediaRow.mediaType === MediaFileType.Video && (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <VideoElement
                  width={
                    copyMediaRow.media.file.details.image.width[
                      locale as Languages
                    ]
                  }
                  height={
                    copyMediaRow.media.file.details.image.height[
                      locale as Languages
                    ]
                  }
                  source={convertRelativeUrl(
                    copyMediaRow.media.file.url[locale as Languages],
                  )}
                />
              )}
            </Media>
          )}
          {copyMediaRow.lottieFile && (
            <Media
              placement={copyMediaRow.copyPlacement}
              variant={copyMediaRow.style}
            >
              <LottieFile
                width={copyMediaRow.lottieWidth}
                height={copyMediaRow.lottieHeight}
                path={convertRelativeUrl(
                  copyMediaRow.lottieFile.file.url[locale as Languages],
                )}
              />
            </Media>
          )}
        </Wrapper>
      </AnimatedWrapper>
    )
  );
};

export default CopyMediaRow;
