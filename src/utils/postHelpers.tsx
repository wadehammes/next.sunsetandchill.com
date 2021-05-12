import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { FC, ReactElement, useEffect } from "react";
import { BlogPost } from "src/components/Blog/BlogPost.component";
import {
  BlogCategoryType,
  BlogPostType,
} from "src/components/Blog/Blog.interfaces";
import { BlogCategoryPage } from "src/components/Blog/BlogCategoryPage.component";
import { PageType } from "src/components/Page/Page.interfaces";
import { Entry } from "src/interfaces/common.interfaces";
import { getFooterProps, getNavigationProps } from "src/utils/pageHelpers";
import { BlogPage } from "src/components/Blog/BlogPage.component";
import { useRouter } from "next/router";
import Head from "next/head";
import PageLoading from "src/components/PageLoading/PageLoading.component";

export type GetPostProps = (context: GetStaticPropsContext) => Promise<{
  page?: PageType | Entry;
  post?: BlogPostType | Entry;
  posts?: BlogPostType[];
  similarPosts?: BlogPostType[];
  categories?: BlogCategoryType[];
  preview?: boolean;
}>;

export const makeGetStaticProps =
  (getPostProps: GetPostProps): GetStaticProps =>
  async (context) => {
    const postProps = await getPostProps(context);
    const navigationProps = await getNavigationProps();
    const footerProps = await getFooterProps();

    return {
      props: {
        ...postProps,
        navigation: navigationProps,
        footer: footerProps,
      },
    };
  };

export const PostComponent: FC = (
  props: InferGetStaticPropsType<GetStaticProps>,
): ReactElement => {
  const { post, categories, similarPosts, navigation, footer } = props;

  return (
    <BlogPost
      post={post}
      similarPosts={similarPosts}
      categories={categories}
      navItems={navigation}
      footerProps={footer}
    />
  );
};

export const PreviewPostComponent: FC = (
  props: InferGetStaticPropsType<GetStaticProps>,
): ReactElement => {
  const { post, categories, similarPosts, navigation, footer } = props;
  const { replace, isPreview } = useRouter();

  // Redirect preview to home page if not preview mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // Shareable Preview URL
    //
    // If not in preview mode and url contains a id param,
    // fetch the preview via our API
    if (!isPreview && urlParams.has("id")) {
      replace(
        `/api/blog-post-preview?secret=${
          process.env.API_SECRET
        }&id=${urlParams.get("id")}`,
      );
    }

    if (!isPreview && !urlParams.has("id")) {
      replace("/");
    }
  }, [isPreview, replace]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <BlogPost
        post={post}
        similarPosts={similarPosts}
        categories={categories}
        navItems={navigation}
        footerProps={footer}
      />
      {!isPreview && <PageLoading overrideFallback />}
    </>
  );
};

export const CategoryPageComponent: FC = (
  props: InferGetStaticPropsType<GetStaticProps>,
): ReactElement => {
  const { page, posts, category, navigation, footer } = props;

  return (
    <BlogCategoryPage
      posts={posts}
      page={page}
      category={category}
      navItems={navigation}
      footerProps={footer}
    />
  );
};

export const BlogPageComponent: FC = (
  props: InferGetStaticPropsType<GetStaticProps>,
): ReactElement => {
  const { page, posts, categories, navigation, footer } = props;

  return (
    <BlogPage
      posts={posts}
      page={page}
      categories={categories}
      navItems={navigation}
      footerProps={footer}
    />
  );
};
