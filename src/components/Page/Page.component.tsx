import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { SectionType } from "src/components/PageSection/PageSection.interfaces";
import { PageType, PageTypes } from "src/components/Page/Page.interfaces";
import {
  NavigationTheme,
  NavigationType,
} from "src/components/Navigation/Navigation.interfaces";
import { FooterType } from "src/components/Footer/Footer.interfaces";
import { AddressLookupType } from "src/components/AddressLookup/AddressLookup.interfaces";
import { SectionRenderer } from "src/components/SectionRenderer/SectionRenderer.component";
import { PageStructure } from "src/components/PageStructure/PageStructure.component";
import { WebPage, WithContext } from "schema-dts";
import Head from "next/head";
import { useRouter } from "next/router";
import { Languages } from "src/interfaces/common.interfaces";
import { CONSTANTS } from "src/utils/constants";
import { convertRelativeUrl } from "src/utils/helpers";

const PageLoading = dynamic(() =>
  import("src/components/PageLoading/PageLoading.component"),
);

export interface PageProps {
  readonly page: PageType;
  navItems: NavigationType;
  footerProps: {
    footer: FooterType;
    addressLookupMetadata: AddressLookupType;
  };
}

export const PageContent = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
`;

export const Page: FC<PageProps> = ({ navItems, page, footerProps }) => {
  const { locale } = useRouter();
  const [pageSchema, setPageSchema] = useState<WithContext<WebPage>>();

  useEffect(() => {
    const slug =
      page.slug === CONSTANTS.RH_HOME_PAGE_SLUG ? "" : page.previewSlug;

    const keywords = page.metadata.pageKeyword
      ? page.metadata?.pageKeyword[locale as Languages].trim().split(",")
      : [];

    const alternateName = page.metadata.pageNavigationTitle
      ? page.metadata.pageNavigationTitle[locale as Languages]
      : "";

    const description = page.metadata.pageDescription
      ? page.metadata.pageDescription[locale as Languages]
      : "";

    setPageSchema({
      "@context": "https://schema.org",
      "@type": "WebPage",
      headline: page.metadata.pageDisplayTitle[locale as Languages],
      alternateName,
      description,
      keywords,
      lastReviewed: page.pageData.updatedAt,
      dateCreated: page.pageData.createdAt,
      dateModified: page.pageData.updatedAt,
      datePublished: page.pageData.createdAt,
      inLanguage: locale,
      isFamilyFriendly: true,
      copyrightYear: new Date(page.pageData.createdAt).getFullYear(),
      copyrightHolder: "",
      publisher: {
        "@type": "Organization",
        name: "Rhythm Energy",
        url: "https://www.gotrhythm.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.gotrhythm.com/public/logo/rhythm-logo-311x120.png",
          width: "311",
          height: "120",
        },
      },
      maintainer: {
        "@type": "Organization",
        name: "Rhythm Energy",
        url: "https://www.gotrhythm.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://www.gotrhythm.com/public/logo/rhythm-logo-311x120.png",
          width: "311",
          height: "120",
        },
      },
      mainEntityOfPage: `https://www.gotrhythm.com/${slug}`,
      mainContentOfPage: {
        "@type": "WebPageElement",
        cssSelector: "[class^='Pagecomponent']",
      },
      primaryImageOfPage: page.metadata.openGraphImage
        ? {
            "@type": "ImageObject",
            url: convertRelativeUrl(
              page.metadata.openGraphImage.file.url[locale as Languages],
            ),
            height: `${
              page.metadata.openGraphImage.file.details.image.height[
                locale as Languages
              ]
            }`,
            width: `${
              page.metadata.openGraphImage.file.details.image.width[
                locale as Languages
              ]
            }`,
          }
        : undefined,
    });
  }, [page, locale]);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
      </Head>
      <PageStructure
        pageType={page?.pageType ?? PageTypes.Regular}
        metadata={page?.metadata ?? {}}
        navProps={{
          navItems,
          navTheme: page?.navigationTheme ?? NavigationTheme.Dark,
          pageLimitedNav: page?.showLimitedNavigation ?? false,
          pageLimitedNavPhone: page?.limitedNavAcquisitionPhoneNumber ?? "",
          pageHideAllNav: page?.hideAllNavigation ?? false,
          pageHideSignUpButton: page?.hideSignUpButton ?? false,
          pageSignUpParams: page?.additionalParamsForSignUpButton ?? "",
          pagePersistentNav: page?.enablePersistentNav ?? false,
          pageBanner: page?.pageBanner ?? null,
        }}
        footerProps={{
          pageLimitedNav: page?.showLimitedNavigation ?? false,
          ...footerProps,
        }}
      >
        <PageLoading />
        {page?.sections?.map((section: SectionType) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </PageStructure>
    </>
  );
};
