import { FC, ReactElement } from "react";
import { InferGetStaticPropsType, GetStaticPaths } from "next";
import { getPage } from "src/client/index";
import { Page } from "src/components/Page/Page.component";
import { CityDataContext } from "src/context/cityData.context";
import { CityDataRow } from "src/interfaces/common.interfaces";
import { slugifyCity } from "src/lib/city";
import { parseCsv } from "src/lib/csv";
import { convertRelativeUrl } from "src/utils/helpers";
import { GetPageProps, makeGetStaticProps } from "src/utils/pageHelpers";

const CityPage: FC = ({
  cityData,
  footer,
  navigation,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement => (
    <CityDataContext.Provider value={cityData}>
      <Page page={page} navItems={navigation} footerProps={footer} />
    </CityDataContext.Provider>
  );

const getPageProps: GetPageProps = async ({ params, preview = false }) => {
  const page = await getPage({
    slug: "electricity-texas-city",
    preview,
  });
  const cities = await parseCsv<CityDataRow>(
    convertRelativeUrl(page.pageCsvData),
  );
  const cityData = cities.find((row) => slugifyCity(row) === params?.city);

  return {
    cityData,
    page,
  };
};

export const getStaticProps = makeGetStaticProps(getPageProps);

// eslint-disable-next-line require-await
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const cityPage = await getPage({
    slug: "electricity-texas-city",
  });
  const cities = await parseCsv<CityDataRow>(
    convertRelativeUrl(cityPage.pageCsvData),
  );

  const enCityPages = cities.map((row) => ({
    params: { city: slugifyCity(row) },
    locale: "en",
  }));
  const esCityPages = cities.map((row) => ({
    params: { city: slugifyCity(row) },
    locale: "es",
  }));

  return {
    paths: [...enCityPages, ...esCityPages],
    fallback: false,
  };
};

// eslint-disable-next-line import/no-default-export
export default CityPage;
