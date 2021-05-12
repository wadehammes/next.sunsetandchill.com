import { FC } from "react";
import { device } from "src/styles/theme";
import styled from "styled-components";
import { Container } from "src/components/Layout";
import { Alignment, ContentfulColors } from "src/interfaces/common.interfaces";

interface BlogSectionProps {
  backgroundColor?: ContentfulColors;
  align?: Alignment;
}

const BlogSectionWrapper = styled.div<BlogSectionProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: ${({ theme }) => theme.sizing.sections.mobile};

  @media ${device.laptop} {
    padding: ${({ theme }) => theme.sizing.sections.laptop};
  }
`;

export const BlogSection: FC<BlogSectionProps> = ({
  children,
  backgroundColor = ContentfulColors.PurpleGradient,
  align = Alignment.Left,
}) => (
  <BlogSectionWrapper backgroundColor={backgroundColor}>
    <Container align={align}>{children}</Container>
  </BlogSectionWrapper>
);
