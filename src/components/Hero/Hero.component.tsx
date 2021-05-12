import { FC, useCallback } from "react";
import dynamic from "next/dynamic";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import {
  HeroSvgDesktopSize,
  HeroTexasCityImage,
  HeroType,
} from "src/components/Hero/Hero.interfaces";
import {
  Alignment,
  BackgroundSizing,
  ContentfulColors,
  Languages,
} from "src/interfaces/common.interfaces";
import { ButtonSizes } from "src/components/Button/Button.interfaces";
import { useCityData } from "src/context/cityData.context";
import {
  device,
  darkBackgrounds,
  contentfulColorMapping,
} from "src/styles/theme";
import { convertRelativeUrl } from "src/utils/helpers";
import { H1, H3, makeComponent } from "src/components/Typography";
import { Container } from "src/components/Layout";

const Image = dynamic(() => import("next/image"));

const AddressLookup = dynamic(() =>
  import("src/components/AddressLookup/AddressLookup.component"),
);

const Breadcrumbs = dynamic(() =>
  import("src/components/Breadcrumbs/Breadcrumbs.component"),
);

const CTA = dynamic(() => import("src/components/CTA/CTA.component"));

const DallasHero = dynamic(() => import("src/styles/images/Dallas.image"));

const HoustonHero = dynamic(() => import("src/styles/images/Houston.image"));

const LottieFile = dynamic(() =>
  import("src/components/LottieFile/LottieFile.component"),
);

const OtherHero = dynamic(() => import("src/styles/images/Other.image"));

interface HeroProps {
  readonly hero: HeroType;
}

interface HeroContentProps {
  align?: Alignment;
  hasImage?: boolean;
  hasImageAbove?: boolean;
}

interface HeroMediaProps extends HeroContentProps {
  fade?: boolean;
  mediaWidth?: number;
  mediaHeight?: number;
  isLottie?: boolean;
}

interface HeroWrapperProps extends HeroContentProps {
  image?: boolean;
  backgroundColor?: ContentfulColors;
  backgroundImage?: string;
  backgroundImagePadding?: number;
  backgroundImageSizing?: BackgroundSizing;
}

const HeroWrapper = styled.div<HeroWrapperProps>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-position: bottom center;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor
      ? contentfulColorMapping[backgroundColor]
      : theme.colors.white};
  padding-top: ${({ theme }) => theme.sizing.hero.mobile};
  width: 100%;
  position: relative;
  z-index: 2;
  overflow: hidden;

  @media ${device.tablet} {
    padding-top: ${({ theme }) => theme.sizing.hero.laptop};
  }

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

  ${({ backgroundImage, backgroundImageSizing, backgroundImagePadding }) =>
    backgroundImage &&
    css`
      padding-top: ${({ theme }) => theme.sizing.hero.laptop};
      background-image: url(${backgroundImage});
      background-size: ${backgroundImageSizing?.toLowerCase()};
      background-repeat: no-repeat;
      min-height: 40vw;
      padding-bottom: ${backgroundImagePadding
        ? `${backgroundImagePadding}em`
        : 0};

      @media ${device.tablet} {
        min-height: 45vw;
      }

      @media ${device.laptop} {
        min-height: 50vw;
      }
    `}
`;

const HeroH2 = styled(H3)`
  margin-bottom: 0.5em;
  max-width: 65ch;
`;

const HeroContent = styled.div<HeroContentProps>`
  display: grid;
  grid-gap: ${({ theme }) => theme.sizing.main};
  max-width: 77ch;
  padding: 0 0 ${({ theme }) => theme.sizing.small} 0;
  text-align: ${({ align }) => (align ? align.toLowerCase() : Alignment.Left)};
  flex: 2;

  > * {
    justify-self: start;
  }

  ${({ align }) =>
    align &&
    align === Alignment.Left &&
    css`
      text-align: left;

      ${HeroH2} {
        padding: 0;

        @media ${device.tablet} {
          max-width: 48ch;
        }
      }

      > * {
        justify-self: flex-start;
      }
    `}

  ${({ align }) =>
    align &&
    align === Alignment.Center &&
    css`
      margin: 0 auto;
      text-align: center;

      ${HeroH2} {
        padding: 0;
      }

      > * {
        justify-self: center;
      }
    `}

  ${({ align }) =>
    align &&
    align === Alignment.Right &&
    css`
      width: 100%;

      > * {
        justify-self: end;
      }
    `}

  ${({ hasImage, theme }) =>
    !hasImage &&
    css`
      padding-bottom: 2.5em;

      @media ${device.tablet} {
        padding-bottom: 5em;
      }
    `}
`;

const HeroFlexWrapper = styled.div<HeroContentProps>`
  display: flex;
  flex-flow: column nowrap;

  @media ${device.laptop} {
    flex-flow: ${({ align }) => (align === Alignment.Center ? "column" : "row")}
      nowrap;
  }
`;

const HeroMedia = styled.div<HeroMediaProps>`
  position: relative;
  bottom: 0;
  flex: 1;
  width: 100%;
  text-align: center;
`;

const HeroSVGAbove = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.sizing.main};
`;

const HeroSvg = styled.div<HeroMediaProps>`
  display: flex;
  text-align: center;
  position: relative;
  left: 50%;
  margin-left: ${({ theme }) => `calc(-${theme.sizing.container} / 2)`};
  font-size: 7px;
  width: ${({ theme }) => theme.sizing.container};
  min-height: 20em;

  ${({ isLottie, theme }) =>
    isLottie &&
    css`
      min-height: ${theme.sizing.lottieHeight};
    `}

  img {
    width: ${({ theme }) => theme.sizing.container};
  }

  @media ${device.tablet} {
    font-size: 13px;
  }

  ${css`
    @media ${device.laptop} and ${device.tabletVert} {
      font-size: 13px;
    }

    @media ${device.laptop} and ${device.laptopVert} {
      font-size: 16px;
    }
  `}
`;

const HeroSeoHeroSvg = styled.div<HeroMediaProps>`
  margin-top: -${({ theme }) => theme.sizing.main};
  margin-left: -10%;
  width: 120%;
  min-height: 10em;

  svg {
    width: 100%;
    height: auto;
  }

  @media ${device.tablet} {
    margin-top: -${({ theme }) => theme.sizing.main};
    margin-bottom: ${({ theme }) => theme.sizing.main};
    margin-left: 0;
    width: 100%;
  }
`;

interface HeroContainerProps {
  size?: HeroSvgDesktopSize;
}

const HeroContainer = styled(Container)<HeroContainerProps>`
  ${({ size, theme }) =>
    size === HeroSvgDesktopSize.FullWidth &&
    css`
      max-width: 100%;

      ${HeroMedia} {
        z-index: 0;

        img {
          @media ${device.laptop} {
            width: 160em;
            max-width: 160em;
            left: 50%;
            bottom: 0;
            margin-top: ${theme.sizing.large};
            margin-left: -80em;
            margin-bottom: -4em;
          }
        }
      }
    `}
`;

export const Hero: FC<HeroProps> = ({ hero }) => {
  const cityData = useCityData();
  const { locale } = useRouter();

  const isDarkBackground = Boolean(
    darkBackgrounds.includes(hero?.heroBackgroundColor),
  );

  const renderHeroCityImage = useCallback(() => {
    switch (cityData?.heroImage) {
      case HeroTexasCityImage.Dallas:
        return <DallasHero />;
      case HeroTexasCityImage.Houston:
        return <HoustonHero />;
      case HeroTexasCityImage.Other:
      default:
        return <OtherHero />;
    }
  }, [cityData?.heroImage]);

  return (
    hero && (
      <HeroWrapper
        className={`${hero?.type}`}
        image={Boolean(hero?.heroSvgDesktop)}
        backgroundImage={convertRelativeUrl(
          hero?.heroBackgroundImage?.file?.url[locale as Languages] ?? null,
        )}
        backgroundImageSizing={
          hero?.heroBackgroundImageSizing ?? BackgroundSizing.Cover
        }
        backgroundImagePadding={hero?.heroBackgroundImagePadding ?? 0}
        backgroundColor={
          hero?.heroBackgroundColor ?? ContentfulColors.PurpleGradient
        }
        align={hero?.heroAlignment ?? Alignment.Center}
      >
        {hero?.showBreadcrumbs && (
          <Breadcrumbs lightVariant={isDarkBackground} />
        )}
        <HeroContainer size={hero?.heroSvgDesktopSize}>
          <HeroFlexWrapper align={hero.heroAlignment}>
            {hero.heroSvgAboveContent && (
              <HeroSVGAbove>
                <Image
                  src={convertRelativeUrl(
                    hero.heroSvgAboveContent.file.url[locale as Languages],
                  )}
                  width={
                    hero.heroSvgAboveContent.file.details.image.width[
                      locale as Languages
                    ] / 2
                  }
                  height={
                    hero.heroSvgAboveContent.file.details.image.height[
                      locale as Languages
                    ] / 2
                  }
                  alt={
                    hero.heroSvgAboveContent?.title[locale as Languages] ?? ""
                  }
                  role="presentation"
                  priority
                  quality={100}
                />
              </HeroSVGAbove>
            )}
            <HeroContent
              align={hero.heroAlignment}
              hasImage={
                Boolean(hero?.heroSvgDesktop) || Boolean(hero?.heroLottieFile)
              }
              hasImageAbove={Boolean(hero?.heroSvgAboveContent)}
            >
              <H1 color={hero.heroTitleColor}>
                {hero.heroTitle[locale as Languages]}
              </H1>
              {hero.heroDescription && (
                <HeroH2
                  as={makeComponent("h2")}
                  style={{
                    color: contentfulColorMapping[hero.heroDescriptionColor],
                  }}
                >
                  {hero.heroDescription[locale as Languages]}
                </HeroH2>
              )}
              {hero.heroCta && !hero?.addressLookup && (
                <CTA
                  cta={hero?.heroCta}
                  size={ButtonSizes.Large}
                  lightVariant={isDarkBackground}
                />
              )}
              {hero?.addressLookupMetadata && hero?.addressLookup && (
                <AddressLookup
                  lookupId="heroZipcodeLookup"
                  align={hero?.heroAlignment}
                  metadata={hero.addressLookupMetadata}
                  sectionColor={
                    hero?.heroBackgroundColor ?? ContentfulColors.Transparent
                  }
                />
              )}
            </HeroContent>
            {hero?.heroSvgDesktop &&
              !hero?.heroLottieFile &&
              !hero?.heroBackgroundImage && (
                <HeroMedia
                  align={hero?.heroAlignment}
                  mediaWidth={
                    hero.heroSvgDesktop.file.details.image.width[
                      locale as Languages
                    ]
                  }
                  mediaHeight={
                    hero.heroSvgDesktop.file.details.image.height[
                      locale as Languages
                    ]
                  }
                >
                  <HeroSvg>
                    <Image
                      src={`https:${
                        hero.heroSvgDesktop.file.url[locale as Languages]
                      }`}
                      width={
                        hero.heroSvgDesktop.file.details.image.width[
                          locale as Languages
                        ]
                      }
                      height={
                        hero.heroSvgDesktop.file.details.image.height[
                          locale as Languages
                        ]
                      }
                      alt={
                        hero.heroSvgDesktop?.title[locale as Languages] ?? ""
                      }
                      role="presentation"
                      quality={100}
                      priority
                    />
                  </HeroSvg>
                </HeroMedia>
              )}
            {hero?.heroLottieFile && !hero?.heroBackgroundImage && (
              <HeroMedia>
                <HeroSvg isLottie>
                  <LottieFile
                    path={hero.heroLottieFile.file.url[locale as Languages]}
                    height={hero.heroLottieHeight}
                    renderer={hero.heroLottieRendererType}
                  />
                </HeroSvg>
              </HeroMedia>
            )}
            {cityData && cityData?.heroImage && (
              <HeroMedia>
                <HeroSeoHeroSvg>{renderHeroCityImage()}</HeroSeoHeroSvg>
              </HeroMedia>
            )}
          </HeroFlexWrapper>
        </HeroContainer>
      </HeroWrapper>
    )
  );
};

export default Hero;
