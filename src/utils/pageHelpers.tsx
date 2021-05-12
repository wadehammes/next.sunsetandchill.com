import {
  getAddressLookupById,
  getEntryById,
  getFooter,
  getNavigation,
  getPageById,
  getPageMetadataById,
} from "src/client";
import { CONSTANTS } from "src/utils/constants";
import { normalizedExternalLink } from "src/components/Footer/Footer.normalizer";
import { PageType } from "src/components/Page/Page.interfaces";
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { FC, ReactElement, useEffect } from "react";
import { Page } from "src/components/Page/Page.component";
import memoize from "lodash.memoize";
import { useRouter } from "next/router";
import { Environments } from "src/interfaces/common.interfaces";
import Head from "next/head";

export const getNavigationProps = memoize(async () => {
  // This is the slug of the navigationComponent found in Contentful,
  // change this to any appropriate navigationComponent slug in constants.
  const navData = await getNavigation({ slug: CONSTANTS.RH_NAV_SLUG });

  // Since componentNavigation subpages are three levels nested, Contentful only gives us their entry IDs.
  // This loops through each page and fetches each subpage entry and then normalizes the response.
  const getPages = async () => {
    const pages = [];

    for (const page of navData?.pages) {
      let metadata = {};
      const subpages = [];

      if (page.subpages) {
        for (const subpage of page?.subpages) {
          subpages.push(
            subpage.id
              ? // eslint-disable-next-line no-await-in-loop
                await getPageById({ id: subpage.id })
              : null,
          );
        }
      }
      if (page.metadata) {
        // eslint-disable-next-line no-await-in-loop
        metadata = await getPageMetadataById({ id: page.metadata });
      }
      pages.push({
        ...page,
        metadata,
        // eslint-disable-next-line no-await-in-loop
        subpages: await Promise.all(subpages),
      });
    }

    return {
      ...navData,
      pages,
    };
  };
  const pages = await getPages();

  return { ...pages };
});

export const getFooterProps = memoize(async () => {
  const fetchFooter = await getFooter({ slug: CONSTANTS.RH_FOOTER_SLUG });

  // Since footerNavBlock navLinks are three levels nested, Contentful only gives us their entry IDs.
  // This loops through each block and fetches each nav entry and then normalizes the response.
  const getNavLinks = async () => {
    const blocks = [];

    for (const block of fetchFooter?.footerNavBlocks) {
      const links = [];
      const externalLinks = [];

      if (block) {
        // Fetch page links and normalize them
        for (const id of block?.navLinks) {
          // eslint-disable-next-line no-await-in-loop
          links.push(id ? await getPageById({ id }) : null);
        }

        // Fetch our external links for this nav block
        for (const id of block?.navExternalLinks) {
          // eslint-disable-next-line no-await-in-loop
          externalLinks.push(
            id
              ? // eslint-disable-next-line no-await-in-loop
                await getEntryById({
                  id,
                  locale: "*",
                  normalizer: normalizedExternalLink,
                })
              : null,
          );
        }
      }
      blocks.push({
        ...block,
        // eslint-disable-next-line no-await-in-loop
        navLinks: await Promise.all(links),
        // eslint-disable-next-line no-await-in-loop
        navExternalLinks: await Promise.all(externalLinks),
      });
    }

    return {
      ...fetchFooter,
      footerNavBlocks: blocks,
    };
  };
  const fetchedFooter = await getNavLinks();

  const fetchedAddressLookupMetadata = await getAddressLookupById({
    id: fetchFooter.addressLookupMetadata,
  });

  return {
    footer: fetchedFooter,
    addressLookupMetadata: fetchedAddressLookupMetadata,
  };
});

export type GetPageProps = (
  context: GetStaticPropsContext,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<{
  page: PageType;
  preview?: boolean;
}>;

export const makeGetStaticProps =
  (getPageProps: GetPageProps): GetStaticProps =>
  async (context) => {
    const pageProps = await getPageProps(context);
    const navigationProps = await getNavigationProps();
    const footerProps = await getFooterProps();
    // https://nextjs.org/blog/next-10#notfound-support
    let notFound: Record<string, boolean> = {
      notFound: Boolean(!pageProps.page),
    };

    // Don't spread notFound if this is the 404 page or it will error
    if (pageProps?.page?.slug === CONSTANTS.RH_ERROR_PAGE) {
      notFound = {};
    }

    // Only revalidate staging pages for Preview purposes
    const revalidate =
      process.env.ENVIRONMENT !== Environments.Production
        ? { revalidate: 1 }
        : {};

    return {
      props: {
        ...pageProps,
        navigation: navigationProps,
        footer: footerProps,
      },
      ...notFound,
      ...revalidate,
    };
  };

export const PageComponent: FC = (
  props: InferGetStaticPropsType<GetStaticProps>,
): ReactElement => {
  const { page, navigation, footer } = props;

  return <Page page={page} navItems={navigation} footerProps={footer} />;
};

export const PreviewPageComponent: FC = (
  props: InferGetStaticPropsType<GetStaticProps>,
): ReactElement => {
  const { page, navigation, footer } = props;
  const { replace, isPreview } = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // Shareable Preview URL
    //
    // If not in preview mode and url contains a id param,
    // fetch the preview via our API
    if (!isPreview && urlParams.has("id")) {
      replace(
        `/api/page-preview?secret=${process.env.API_SECRET}&id=${urlParams.get(
          "id",
        )}`,
      );
    }

    if (!isPreview && !urlParams.has("id")) {
      replace("/");
    }
  }, [replace, isPreview]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Page page={page} navItems={navigation} footerProps={footer} />
    </>
  );
};
