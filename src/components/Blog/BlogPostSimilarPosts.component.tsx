import { FC } from "react";
import { BlogPostType } from "src/components/Blog/Blog.interfaces";
import { BlogPostCardGrid } from "src/components/Blog/BlogPostCardGrid.component";
import {
  Alignment,
  ContentfulColors,
  Languages,
  LanguageString,
} from "src/interfaces/common.interfaces";
import { H2 } from "src/components/Typography";
import { BlogSection } from "src/components/Blog/BlogSection.component";
import { useRouter } from "next/router";

interface BlogPostSimilarPostsProps {
  title: LanguageString;
  posts: BlogPostType[];
}

export const BlogPostSimilarPosts: FC<BlogPostSimilarPostsProps> = ({
  title,
  posts,
}) => {
  const { locale } = useRouter();

  return (
    <BlogSection align={Alignment.Center}>
      <H2 color={ContentfulColors.White} style={{ margin: "0 0 1em 0" }}>
        {title[locale as Languages]}
      </H2>
      <BlogPostCardGrid posts={posts} limit={3} />
    </BlogSection>
  );
};

export default BlogPostSimilarPosts;
