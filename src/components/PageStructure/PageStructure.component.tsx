import { FC } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PageContent } from "src/components/Page/Page.component";
import {
  PageMetadataType,
  PageTypes,
} from "src/components/Page/Page.interfaces";
import { BlogPostMetadataType } from "src/components/Blog/Blog.interfaces";
import {
  NavigationTheme,
  NavProps,
} from "src/components/Navigation/Navigation.interfaces";
import styled, { css } from "styled-components";
import { contentfulColorMapping, device } from "src/styles/theme";
import {
  ContentfulColors,
  PreviewProps,
} from "src/interfaces/common.interfaces";
import { FooterProps } from "src/components/Footer/Footer.interfaces";

const Helmet = dynamic(() => import("src/components/Page/Helmet.component"));

const Navigation = dynamic(() =>
  import("src/components/Navigation/Navigation.component"),
);

const Footer = dynamic(() => import("src/components/Footer/Footer.component"));

const PreviewAlert = dynamic(() =>
  import("src/components/PreviewAlert/PreviewAlert.component"),
);

interface PageWrapperProps extends PreviewProps {
  hasBanner?: boolean;
  className?: string;
}

const PageWrapper = styled.div<PageWrapperProps>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-flow: column nowrap;
  min-height: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.sizing.navHeight} 0 0 0;

  ${({ preview }) =>
    preview &&
    css`
      padding-top: ${({ theme }) => `calc(${theme.sizing.navHeight} * 1.5)`};
    `}

  ${({ hasBanner }) =>
    hasBanner &&
    css`
      padding-top: ${({ theme }) => `calc(${theme.sizing.navHeight} * 1.75)`};

      @media ${device.tablet} {
        padding-top: ${({ theme }) => `calc(${theme.sizing.navHeight} * 1.5)`};
      }
    `}

  ${({ preview, hasBanner }) =>
    preview &&
    hasBanner &&
    css`
      padding-top: ${({ theme }) => `calc(${theme.sizing.navHeight} * 2)`};

      @media ${device.tablet} {
        padding-top: ${({ theme }) => `calc(${theme.sizing.navHeight} * 2.5)`};
      }
    `}
`;

// Pages that we always want indexed and followed in metadata
const LISTED_PAGES: PageTypes[] = [
  PageTypes.Regular,
  PageTypes.Electricity,
  PageTypes.Versus,
];

export interface PageStructureProps {
  pageType?: PageTypes;
  metadata: PageMetadataType | BlogPostMetadataType;
  navProps: NavProps;
  footerProps: FooterProps;
}

export const PageStructure: FC<PageStructureProps> = ({
  pageType = PageTypes.Regular,
  metadata,
  navProps,
  footerProps,
  children,
}) => {
  const { isPreview } = useRouter();

  const navTheme = navProps?.navTheme ?? NavigationTheme.Dark;

  const hasBanner = Boolean(
    navProps?.pageBanner ?? navProps?.navItems?.banner ?? false,
  );

  return (
    <>
      <Helmet metadata={metadata}>
        <>
          <style>
            {css`
              body,
              html {
                background-color: ${navTheme === NavigationTheme.Dark
                  ? contentfulColorMapping[ContentfulColors.DarkPurple]
                  : contentfulColorMapping[ContentfulColors.White]};
              }
            `}
          </style>
          {LISTED_PAGES.includes(pageType) ? (
            <meta
              name="robots"
              content={metadata?.pageRobots ?? "index, follow"}
            />
          ) : (
            <meta
              name="robots"
              content={metadata?.pageRobots ?? "noindex, follow"}
            />
          )}
        </>
      </Helmet>
      <PageWrapper preview={isPreview} hasBanner={hasBanner}>
        {isPreview && <PreviewAlert />}
        <Navigation {...navProps} />
        <PageContent>{children}</PageContent>
        <Footer {...footerProps} />
      </PageWrapper>
    </>
  );
};
