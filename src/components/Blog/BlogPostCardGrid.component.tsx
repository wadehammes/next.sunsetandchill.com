import { Grid } from "src/components/Layout";
import { PageSectionLayoutTypes } from "src/components/PageSection/PageSection.interfaces";
import { BlogArticleCard } from "src/components/Blog/BlogArticleCard.component";
import { useInView } from "react-intersection-observer";
import { BlogPostType } from "src/components/Blog/Blog.interfaces";
import { FC } from "react";

interface BlogPostCardGridProps {
  posts: BlogPostType[];
  limit?: number; // Limit the amount of posts to show
}

export const BlogPostCardGrid: FC<BlogPostCardGridProps> = ({
  posts,
  limit = 99999, // TODO: set this to pagination limits once implemented
}) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
  });

  return (
    <Grid ref={ref} variant={PageSectionLayoutTypes.Grid3x3}>
      {posts
        .sort(
          (a, b) =>
            new Date(a.blogPostPublishedDate).getTime() -
            new Date(b.blogPostPublishedDate).getTime(),
        )
        .reverse()
        .slice(0, limit)
        .map((post, index: number) => (
            <BlogArticleCard
              key={post.id}
              post={post}
              wait={index}
              animate={inView}
            />
          ))}
    </Grid>
  );
};
