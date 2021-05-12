import React, { FC } from "react";
import { Content, Grid } from "src/components/Layout";
import Sidebar from "src/components/Sidebar/Sidebar.component";

export const PageStructure: FC = ({ children }) => (
  <Grid data-testid="scPageStructure" gridHeight="100vh">
    <Sidebar />
    <Content data-testid="scContent">{children}</Content>
  </Grid>
);

export default PageStructure;
