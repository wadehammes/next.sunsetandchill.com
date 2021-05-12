import React, { FC } from "react";
import { Content, Grid, Sidebar } from "src/components/Layout";
import styled from "styled-components";

const PageStructureWrapper = styled.div``;

export const PageStructure: FC = ({ children }) => (
  <PageStructureWrapper data-testid="scPageStructure">
    <Grid>
      <Sidebar data-testid="scSidebar">Sidebar</Sidebar>
      <Content data-testid="scContent">{children}</Content>
    </Grid>
  </PageStructureWrapper>
);

export default PageStructure;
