import React, { FC } from "react";
import Head from "next/head";
import { Content, Grid } from "src/components/Layout";
import Sidebar from "src/components/Sidebar/Sidebar.component";
import { constants } from "src/constants";

interface PageStructureProps {
  meta?: {
    title: string;
    description: string;
  };
}

export const PageStructure: FC<PageStructureProps> = ({
  children,
  meta = {
    title: constants.title,
    description: constants.description,
  },
}) => (
  <>
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
    </Head>
    <Grid data-testid="scPageStructure" gridHeight="100vh">
      <Sidebar />
      <Content data-testid="scContent">{children}</Content>
    </Grid>
  </>
);

export default PageStructure;
