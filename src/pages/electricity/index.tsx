import { getPage } from "src/client";
import {
  GetPageProps,
  makeGetStaticProps,
  PageComponent,
} from "src/utils/pageHelpers";

const getPageProps: GetPageProps = async ({
  preview = false,
  locale = "en",
}) => {
  const page = await getPage({
    slug: "electricity",
    preview,
  });

  return {
    page,
    locale,
  };
};

export const getStaticProps = makeGetStaticProps(getPageProps);

// eslint-disable-next-line import/no-default-export
export default PageComponent;
