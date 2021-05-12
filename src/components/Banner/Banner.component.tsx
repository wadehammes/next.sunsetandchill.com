/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FC, useCallback } from "react";
import { useRouter } from "next/router";
import { ContentfulColors, Languages } from "src/interfaces/common.interfaces";
import { contentfulColorMapping, device } from "src/styles/theme";
import styled, { css } from "styled-components";
import { BannerType } from "src/components/Banner/Banner.interfaces";
import { RhythmLink } from "src/components/RhythmLink/RhythmLink.component";
import { useQueryParamString } from "src/hooks/useQueryParamString";
import { appendUrlParams } from "src/utils/helpers";
import { trackEvent } from "src/lib/analytics";
import { CONSTANTS } from "src/utils/constants";

interface BannerStyleProps {
  background: ContentfulColors;
  color: ContentfulColors;
  hideBanner: boolean;
  preview?: boolean;
}

interface BannerProps {
  banner: BannerType;
  hideBanner: boolean;
}

const BannerWrapper = styled.div<BannerStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75em 1.5em;
  position: fixed;
  left: 0;
  top: ${({ theme }) => theme.sizing.navHeight};
  color: ${({ color }) => contentfulColorMapping[color]};
  background-color: ${({ background }) => contentfulColorMapping[background]};
  width: 100%;
  z-index: 98;
  transform: translateY(0);
  transition: transform 0.2s ease-in-out;

  ${({ preview }) =>
    preview &&
    css`
      top: ${({ theme }) => `calc(${theme.sizing.navHeight} + 2.25rem)`};
    `}

  ${({ hideBanner }) =>
    hideBanner &&
    css`
      transform: translateY(-12em);
    `}
`;

const BannerText = styled.span`
  line-height: 1.25;
  padding-right: ${({ theme }) => theme.sizing.small};
  font-size: 0.875rem;

  @media ${device.tablet} {
    font-size: inherit;
  }
`;

const BannerArrow = styled.span`
  &:after {
    content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNyIgaGVpZ2h0PSIxMyIgdmlld0JveD0iMCAwIDcgMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xLjIyMjE3IDEyTDUuOTk5OTUgNi42MjVMMS4yMjIxNyAxLjI1IiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS4wMjM4MSIvPgo8L3N2Zz4K");
    display: inline-block;
    margin: 0 0.5rem;
    transform: translateY(2px);
  }
`;

export const Banner: FC<BannerProps> = ({ banner, hideBanner = false }) => {
  const { locale, isPreview } = useRouter();
  const { queryParamString } = useQueryParamString();

  const handleClick = useCallback(
    (e) => {
      const url = banner?.bannerUrl;

      if (url) {
        // If an app url, send tracking event to Segment
        if (
          url.startsWith(CONSTANTS.RH_APP_HTTPS_URL) ||
          url.startsWith(CONSTANTS.RH_APP_HTTP_URL)
        ) {
          const {
            location: { pathname = "" },
          } = window;
          // Remove leading slash. If pathname is `/`, replace it with "home"
          const categoryPath = pathname.substring(1) || "home";

          trackEvent("enrollmentClick", {
            action: "bannerClicked",
            category: `marketing.${categoryPath}`,
            label: banner?.bannerId ?? "banner",
          });
        }

        // If path starts with #, scroll to section with an offset
        else if (url.startsWith("#")) {
          e.preventDefault();

          setTimeout(() => {
            const id = url.replace("#", "");
            const el = window.document.getElementById(id);

            if (el) {
              const r = el.getBoundingClientRect();

              window.top.scroll({
                // eslint-disable-next-line no-restricted-globals
                top: pageYOffset + r.top - 125,
                behavior: "smooth",
              });
            }
          }, 100);
        }
      }
    },
    [banner?.bannerUrl, banner?.bannerId],
  );

  return (
    <RhythmLink
      href={appendUrlParams(banner.bannerUrl, queryParamString)}
      passHref
    >
      <a
        target={banner.bannerLinkTarget}
        aria-label="Banner"
        id={banner?.bannerId ?? ""}
        data-id={banner?.bannerId ?? ""}
        onClick={handleClick}
      >
        <BannerWrapper
          color={banner.bannerTextColor}
          background={banner.bannerColor}
          hideBanner={hideBanner}
          preview={isPreview}
        >
          <BannerText>{banner.bannerText[locale as Languages]}</BannerText>
          <BannerArrow />
        </BannerWrapper>
      </a>
    </RhythmLink>
  );
};

export default Banner;
