import { FC } from "react";
import {
  ContentfulColors,
  Languages,
  MediaType,
} from "src/interfaces/common.interfaces";
import {
  H3,
  H4,
  A,
  P,
  Bold,
  UL,
  OL,
  HR,
  Blockquote,
  LI,
} from "src/components/Typography";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import {
  alphabetize,
  appendUrlParams,
  convertRelativeUrl,
} from "src/utils/helpers";
import { useRouter } from "next/router";
import {
  BlogAuthorType,
  BlogCategoryType,
  BlogPostCopyType,
} from "src/components/Blog/Blog.interfaces";
import { PostContainer } from "src/components/Layout";
import styled from "styled-components";
import Image from "next/image";
import { normalizedMedia } from "src/client/common.normalizer";
import { device } from "src/styles/theme";
import { RhythmLink } from "src/components/RhythmLink/RhythmLink.component";
import { BlogAuthor } from "src/components/Blog/BlogAuthor.component";
import { useQueryParamString } from "src/hooks/useQueryParamString";

const BlogPostContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.sizing.large} 0 5em;
  min-height: 100vh;

  @media ${device.laptop} {
    padding: ${({ theme }) => theme.sizing.large} 0 7.5em;
  }
`;

const BlogImage = styled.figure`
  padding: ${({ theme }) => theme.sizing.main} 0;
  margin-left: 0;
  width: 100%;
  text-align: center;

  @media ${device.laptop} {
    margin-left: -10em;
    width: calc(100% + 20em);
  }
`;

const BlogImageCaption = styled.figcaption`
  color: ${({ theme }) => theme.colors.grey[500]};
  padding: 0.5em 0 0 0;
  line-height: 1.5;
`;

const BlogPostFooter = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.purple.light};
  padding: ${({ theme }) => theme.sizing.main} 0 0 0;
  margin: ${({ theme }) => theme.sizing.main} 0 0 0;
`;

const Tags = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.purple.dark};
  padding: 0 0 ${({ theme }) => theme.sizing.small} 0;
  line-height: 1.25;

  a {
    text-decoration: underline;
  }
`;

interface BlogPostCopyProps {
  post: BlogPostCopyType;
  author: BlogAuthorType;
  tags: string[];
  categories: BlogCategoryType[];
}

export const BlogPostCopy: FC<BlogPostCopyProps> = ({
  post,
  author,
  tags = [],
  categories = [],
}) => {
  const { locale } = useRouter();
  const { queryParamString } = useQueryParamString();

  const blogCopyParsing: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => (
        <H3
          as="h2"
          style={{ margin: "0 0 1rem 0" }}
          color={ContentfulColors.HeadlinePurple}
        >
          <Bold>{children}</Bold>
        </H3>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <H3 style={{ margin: "0 0 1rem 0" }}>
          <Bold>{children}</Bold>
        </H3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <H4 style={{ margin: "0 0 1rem 0", fontSize: "1rem" }}>{children}</H4>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => <P>{children}</P>,
      [BLOCKS.HR]: (node) => <HR />,
      [BLOCKS.UL_LIST]: (node, children) => <UL>{children}</UL>,
      [BLOCKS.OL_LIST]: (node, children) => <OL>{children}</OL>,
      [BLOCKS.LIST_ITEM]: (node, children) => <LI>{children}</LI>,
      [BLOCKS.QUOTE]: (node, children) => <Blockquote>{children}</Blockquote>,
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        const image: MediaType = normalizedMedia(node.data.target);

        return (
          <BlogImage>
            <Image
              src={convertRelativeUrl(image.file.url[locale as Languages])}
              width={image.file.details.image.width[locale as Languages]}
              height={image.file.details.image.height[locale as Languages]}
              loading="lazy"
              alt={image.title[locale as Languages]}
            />
            {image.description && (
              <BlogImageCaption>
                {image.description[locale as Languages]}
              </BlogImageCaption>
            )}
          </BlogImage>
        );
      },
      [INLINES.HYPERLINK]: (node, children) => (
        <A
          href={appendUrlParams(node.data.uri, queryParamString)}
          color={ContentfulColors.Purple}
          style={{ textDecoration: "underline" }}
        >
          {children}
        </A>
      ),
    },
  };

  return (
    <BlogPostContainer>
      <PostContainer as="article">
        {documentToReactComponents(post[locale as Languages], blogCopyParsing)}
        <BlogPostFooter>
          {categories && (
            <Tags>
              Categories:{" "}
              {alphabetize(categories, "slug").map(
                (category, index: number) => (
                  <span key={category.slug}>
                    {index > 0 ? ", " : null}
                    <RhythmLink href={`/blog/${category.slug}`}>
                      <A
                        target="_self"
                        color={ContentfulColors.Purple}
                        style={{ textDecoration: "underline" }}
                      >
                        {category.categoryName[locale as Languages]}
                      </A>
                    </RhythmLink>
                  </span>
                ),
              )}
            </Tags>
          )}
          {tags && (
            <Tags>Tagged: {tags.map((tag) => tag.trim()).join(", ")}</Tags>
          )}
        </BlogPostFooter>
        {author && author.authorHeadshot && <BlogAuthor author={author} />}
      </PostContainer>
    </BlogPostContainer>
  );
};
