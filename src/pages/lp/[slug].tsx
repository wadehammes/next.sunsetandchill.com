import flatten from "lodash.flatten";
import { GetStaticPaths } from "next";
import { getPage, getPages } from "src/client/index";
import { PageType, PageTypes } from "src/components/Page/Page.interfaces";
import { LOCALES, STATIC_PARENT_PAGES } from "src/utils/constants";
import {
  GetPageProps,
  makeGetStaticProps,
  PageComponent,
} from "src/utils/pageHelpers";

const getPageProps: GetPageProps = async ({ params, preview = false }) => {
  const page = await getPage({
    slug: params?.slug,
    options: { "fields.pageType": PageTypes.LandingPage },
    preview,
  });

  return {
    page,
  };
};

export const getStaticProps = makeGetStaticProps(getPageProps);

// eslint-disable-next-line require-await
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const pages = await getPages({
    options: {
      "fields.pageType": PageTypes.LandingPage,
    },
  });

  const paths = flatten(
    LOCALES.map((locale) => pages
        .filter((page) => !STATIC_PARENT_PAGES.includes(page.slug))
        .map((page: PageType) => ({
          params: { slug: page.slug },
          locale,
        }))),
  );

  return {
    paths,
    fallback: true,
  };
};

// eslint-disable-next-line import/no-default-export
export default PageComponent;
