import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card } from "src/components/Layout";
import { Languages } from "src/interfaces/common.interfaces";
import { convertRelativeUrl } from "src/utils/helpers";
import styled from "styled-components";
import { Bold, H3, P } from "src/components/Typography";
import { BlogPostType } from "src/components/Blog/Blog.interfaces";
import { RhythmLink } from "src/components/RhythmLink/RhythmLink.component";
import { Button } from "src/components/Button/Button.component";
import { ButtonSizes } from "src/components/Button/Button.interfaces";

interface BlogArticleCardProps {
  post: BlogPostType;
  wait?: number;
  animate?: boolean;
}

const Article = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.sizing.main};
  flex: 1;
`;

const ArticleImage = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
  height: 12rem;
  overflow: hidden;
  position: relative;
`;

const ArticleCard = styled(Card)`
  transform: scale(1);
  transition: transform 0.15s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

interface ArticleExcerptProps {
  lines?: number;
}

const ArticleExcerpt = styled(P)<ArticleExcerptProps>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ lines }) => lines || 6};
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

export const BlogArticleCard: FC<BlogArticleCardProps> = ({
  post,
  wait = 0,
  animate,
}) => {
  const { locale } = useRouter();

  const [lineClamp, setLineClamp] = useState<number>(6);

  // This will clamp the excerpt at fewer lines if the title is long
  // so the cards will remain the same height.
  useEffect(() => {
    const titleLength = post?.blogPostTitle[locale as Languages]?.length ?? 0;

    if (titleLength > 50) {
      setLineClamp(5);
    }

    if (titleLength > 75) {
      setLineClamp(4);
    }

    if (titleLength > 100) {
      setLineClamp(2);
    }
  }, [post.blogPostTitle, lineClamp, locale]);

  return (
    <RhythmLink
      href={`/blog/${post.primaryCategory.slug}/${post.slug}`}
      passHref
    >
      <a target="_self">
        <ArticleCard article>
          {post.blogPostImage && (
            <ArticleImage>
              <Image
                src={`${convertRelativeUrl(
                  post.blogPostImage.file.url[locale as Languages],
                )}?w=600`}
                alt={post.blogPostImage.title[locale as Languages]}
                objectFit="cover"
                layout="fill"
                loading="lazy"
                quality={100}
              />
            </ArticleImage>
          )}
          <Article>
            <H3 style={{ padding: "0 0 0.75em 0" }}>
              <Bold>{post.blogPostTitle[locale as Languages]}</Bold>
            </H3>
            <ArticleExcerpt lines={lineClamp}>
              {post.blogPostExcerpt[locale as Languages]}
            </ArticleExcerpt>
            <P>
              <Button
                buttonAs="span"
                buttonDataId={`article-${post.id}`}
                variant={post.blogCardCta.buttonStyle}
                buttonLabel={post.blogCardCta.buttonText[locale as Languages]}
                size={ButtonSizes.Small}
              />
            </P>
          </Article>
        </ArticleCard>
      </a>
    </RhythmLink>
  );
};
