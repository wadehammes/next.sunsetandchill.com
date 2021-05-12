import { FC } from "react";
import { useRouter } from "next/router";
import { BlogPostHeroType } from "src/components/Blog/Blog.interfaces";
import { ContentfulColors, Languages } from "src/interfaces/common.interfaces";
import styled from "styled-components";
import { H1, A } from "src/components/Typography";
import Image from "next/image";
import { convertRelativeUrl, dateOptions } from "src/utils/helpers";
import { PostContainer } from "src/components/Layout";
import { device } from "src/styles/theme";
import { BlogAuthorHeadshot } from "src/components/Blog/BlogAuthorHeadshot.component";
import { RhythmLink } from "src/components/RhythmLink/RhythmLink.component";

const BlogHeroContainer = styled.div``;

const BlogHeroImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 12em;
  background-color: ${({ theme }) => theme.colors.purple.dark};

  @media ${device.tablet} {
    height: 24em;
  }
`;

const BlogHeroPostInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.purple.light};
  padding: ${({ theme }) => theme.sizing.large} 0;
`;

const Byline = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.sizing.small} 0 0 0;
  color: ${({ theme }) => theme.colors.purple.dark};
  line-height: 1.25;
`;

const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  padding: 0 0 ${({ theme }) => theme.sizing.main} 0;

  a {
    color: ${({ theme }) => theme.colors.purple.dark};

    &:hover {
      text-decoration: underline;
    }
  }

  .separator {
    display: inline-block;
    transform: translateY(1px);

    &:after {
      content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNyIgaGVpZ2h0PSIxMyIgdmlld0JveD0iMCAwIDcgMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xLjIyMjE3IDEyTDUuOTk5OTUgNi42MjVMMS4yMjIxNyAxLjI1IiBzdHJva2U9IiM0NTQxNEMiIHN0cm9rZS13aWR0aD0iMS4wMjM4MSIvPgo8L3N2Zz4K");
      padding: 0 0.5em;
    }
  }
`;

interface BlogPostHeroProps {
  hero: BlogPostHeroType;
}

export const BlogPostHero: FC<BlogPostHeroProps> = ({ hero }) => {
  const { locale } = useRouter();

  const author = hero?.author?.authorLink ? (
    <A
      href={hero.author.authorLink}
      color={ContentfulColors.DarkPurple}
      style={{ textDecoration: "underline" }}
    >
      {hero.author.authorName}
    </A>
  ) : (
    <span>{hero.author.authorName}</span>
  );

  return (
    hero && (
      <BlogHeroContainer>
        <BlogHeroImageContainer>
          {hero?.image?.file && (
            <Image
              src={convertRelativeUrl(hero.image.file.url[locale as Languages])}
              alt={hero.image.title[locale as Languages]}
              objectFit="cover"
              layout="fill"
              quality={100}
              priority
            />
          )}
        </BlogHeroImageContainer>
        <BlogHeroPostInfo>
          <PostContainer>
            <Breadcrumbs>
              <RhythmLink href="/blog">
                <a aria-label="The Rhythm Blog">The Rhythm Blog</a>
              </RhythmLink>
              <span className="separator" />
              <RhythmLink href={`/blog/${hero?.primaryCategory.slug}`}>
                <a>{hero?.primaryCategory.categoryName[locale as Languages]}</a>
              </RhythmLink>
            </Breadcrumbs>
            {hero?.title && <H1>{hero.title[locale as Languages]}</H1>}
            {hero?.author && hero?.postData && (
              <Byline>
                {hero?.author?.authorHeadshot && (
                  <BlogAuthorHeadshot
                    headshot={hero.author.authorHeadshot}
                    altTag={hero.author.authorName}
                    size={80}
                  />
                )}
                <span style={{ flex: 2 }}>
                  {author} on{" "}
                  {new Date(hero.publishedDate).toLocaleString(
                    locale,
                    dateOptions,
                  )}
                </span>
              </Byline>
            )}
          </PostContainer>
        </BlogHeroPostInfo>
      </BlogHeroContainer>
    )
  );
};
