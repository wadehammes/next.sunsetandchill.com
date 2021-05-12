import { FC } from "react";
import { BlogAuthorType } from "src/components/Blog/Blog.interfaces";
import styled from "styled-components";
import { BlogAuthorHeadshot } from "src/components/Blog/BlogAuthorHeadshot.component";
import { Bold, H3, P } from "src/components/Typography";
import { Languages } from "src/interfaces/common.interfaces";
import { useRouter } from "next/router";
import { device } from "src/styles/theme";

interface BlogAuthorWrapperProps {
  size: number;
}

const BlogAuthorWrapper = styled.a<BlogAuthorWrapperProps>`
  display: grid;
  grid-template-columns: ${({ size }) => `${size / 2}px`} 1fr;
  align-content: center;
  align-items: center;
  justify-items: flex-start;
  grid-gap: ${({ theme }) => theme.sizing.small};
  background-color: ${({ theme }) => theme.colors.purple.light};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: ${({ theme }) => theme.sizing.small};
  margin: ${({ theme }) => theme.sizing.main} 0 0 0;
  color: ${({ theme }) => theme.colors.purple.dark};
  box-sizing: content-box;
  font-size: 0.8em;

  @media ${device.tablet} {
    padding: ${({ theme }) => theme.sizing.main};
    font-size: 1em;
  }
`;

const BlogAuthorBio = styled.div`
  padding-left: 0.5em;
`;

const BlogAuthorPosition = styled(P)`
  font-size: 1em;
  line-height: 1.25;
  padding-top: 0.5em;
`;

interface BlogAuthorProps {
  author: BlogAuthorType;
  headshotSize?: number;
}

export const BlogAuthor: FC<BlogAuthorProps> = ({
  author,
  headshotSize = 200,
}) => {
  const { locale } = useRouter();

  const inner = (
    <>
      <BlogAuthorHeadshot
        headshot={author.authorHeadshot}
        size={headshotSize}
      />
      <BlogAuthorBio>
        <H3>
          <Bold>{author.authorName}</Bold>
        </H3>
        {author.authorPosition && (
          <BlogAuthorPosition>
            {author.authorPosition[locale as Languages]}
          </BlogAuthorPosition>
        )}
      </BlogAuthorBio>
    </>
  );

  return author.authorLink ? (
    <BlogAuthorWrapper href={author.authorLink} size={headshotSize}>
      {inner}
    </BlogAuthorWrapper>
  ) : (
    <BlogAuthorWrapper as="div" size={headshotSize}>
      {inner}
    </BlogAuthorWrapper>
  );
};
