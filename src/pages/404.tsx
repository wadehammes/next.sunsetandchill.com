import { getPage } from "src/client";
import { CONSTANTS as constant } from "src/utils/constants";
import {
  GetPageProps,
  makeGetStaticProps,
  PageComponent,
} from "src/utils/pageHelpers";

export const getPageProps: GetPageProps = async ({
  preview = false,
  locale = "en",
}) => {
  const page = await getPage({ slug: constant.RH_ERROR_PAGE, preview });

  return {
    page,
    locale,
    preview,
  };
};

export const getStaticProps = makeGetStaticProps(getPageProps);

// eslint-disable-next-line import/no-default-export
export default PageComponent;
