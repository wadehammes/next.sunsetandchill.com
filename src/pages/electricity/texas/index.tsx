import { FC, ReactElement } from "react";
import { InferGetStaticPropsType } from "next";
import { Page } from "src/components/Page/Page.component";
import { getPage } from "src/client";
import { parseCsv } from "src/lib/csv";
import { convertRelativeUrl } from "src/utils/helpers";
import { CityDataRow } from "src/interfaces/common.interfaces";
import { CityDataContext } from "src/context/cityData.context";
import { GetPageProps, makeGetStaticProps } from "src/utils/pageHelpers";

const ElectricityTexas: FC = ({
  page,
  data,
  footer,
  navigation,
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement => (
    <CityDataContext.Provider value={data[0]}>
      <Page page={page} footerProps={footer} navItems={navigation} />
    </CityDataContext.Provider>
  );

export const getPageProps: GetPageProps = async ({ preview = false }) => {
  const page = await getPage({
    slug: "electricity-texas",
    preview,
  });

  const data = await parseCsv<CityDataRow>(
    convertRelativeUrl(page.pageCsvData),
  );

  return {
    page,
    data,
  };
};

export const getStaticProps = makeGetStaticProps(getPageProps);

// eslint-disable-next-line import/no-default-export
export default ElectricityTexas;
