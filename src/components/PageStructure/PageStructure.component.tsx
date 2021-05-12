import React, { FC } from "react";
import { Content, Grid, Sidebar } from "src/components/Layout";

export const PageStructure: FC = ({ children }) => (
  <Grid data-testid="scPageStructure">
    <Sidebar data-testid="scSidebar">Sidebar</Sidebar>
    <Content data-testid="scContent">{children}</Content>
  </Grid>
);

export default PageStructure;
