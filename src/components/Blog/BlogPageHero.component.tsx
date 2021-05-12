import { ChangeEvent, FC, useCallback } from "react";
import { PageMetadataType } from "src/components/Page/Page.interfaces";
import {
  BlogCategoryType,
  BlogPostMetadataType,
} from "src/components/Blog/Blog.interfaces";
import { H1, P } from "src/components/Typography";
import styled, { css } from "styled-components";
import {
  ContentfulColors,
  Languages,
  LanguageString,
} from "src/interfaces/common.interfaces";
import { useRouter } from "next/router";
import { RhythmLink } from "src/components/RhythmLink/RhythmLink.component";
import { Container } from "src/components/Layout";
import { alphabetize } from "src/utils/helpers";
import { useUi } from "src/context/ui.context";
import { device } from "src/styles/theme";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("src/components/Select/Select.component"));

interface BlogPageHeroWrapperProps {
  hasBanner?: boolean;
}

const BlogPageHeroWrapper = styled.div<BlogPageHeroWrapperProps>`
  padding: ${({ theme }) => `${theme.sizing.large} 0 0`};
  text-align: center;

  ${({ hasBanner }) =>
    hasBanner &&
    css`
      padding-top: 6em;
    `}
`;

const Header = styled.header`
  max-width: 66ch;
  margin: 0 auto;
`;

const CategoryLinks = styled.nav`
  justify-content: center;
  padding: ${({ theme }) => theme.sizing.main} 0 0 0;
  display: none;

  @media ${device.laptop} {
    display: flex;
  }

  a {
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      text-decoration: underline;
    }
  }

  > * {
    padding: 0 ${({ theme }) => theme.sizing.small};
  }
`;

const SelectWrapper = styled.div`
  display: block;
  padding: ${({ theme }) => theme.sizing.main} 0 0 0;
  max-width: 20rem;
  margin: 0 auto;

  @media ${device.laptop} {
    display: none;
  }
`;

interface BlogPageHeroProps {
  metadata: PageMetadataType | BlogPostMetadataType;
  categories?: BlogCategoryType[];
  description?: LanguageString;
}

export const BlogPageHero: FC<BlogPageHeroProps> = ({
  metadata,
  categories,
  description,
}) => {
  const { state } = useUi();
  const { hasBanner } = state;
  const { locale, push } = useRouter();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value) {
        push(`/blog/${e.target.value}`);
      }
    },
    [push],
  );

  return (
    <BlogPageHeroWrapper hasBanner={hasBanner}>
      <Container>
        <Header>
          <H1 color={ContentfulColors.White}>
            {metadata.pageNavigationTitle[locale as Languages]}
          </H1>
          {description && (
            <P color={ContentfulColors.White} style={{ paddingTop: "1em" }}>
              {description[locale as Languages]}
            </P>
          )}
        </Header>
        {categories && categories.length >= 2 && (
          <>
            <CategoryLinks>
              {alphabetize(categories, "slug").map((category) => (
                <RhythmLink
                  key={category.slug}
                  href={`/blog/${category.slug}`}
                  passHref
                >
                  <a target="_self">
                    {category.categoryName[locale as Languages]}
                  </a>
                </RhythmLink>
              ))}
            </CategoryLinks>
            <SelectWrapper>
              <Select
                selectId="blogSelect"
                selectLabel="Choose category"
                handleChange={handleChange}
              >
                {alphabetize(categories, "slug").map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.categoryName[locale as Languages]}
                  </option>
                ))}
              </Select>
            </SelectWrapper>
          </>
        )}
      </Container>
    </BlogPageHeroWrapper>
  );
};
