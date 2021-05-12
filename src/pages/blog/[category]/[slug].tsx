import flatten from "lodash.flatten";
import uniqBy from "lodash.uniqby";
import { GetStaticPaths } from "next";
import { getPost, getPosts } from "src/client/index";
import { BlogCategories } from "src/components/Blog/Blog.interfaces";
import { LOCALES } from "src/utils/constants";
import {
  GetPostProps,
  makeGetStaticProps,
  PostComponent,
} from "src/utils/postHelpers";

const getPostProps: GetPostProps = async ({ params, preview = false }) => {
  const post = await getPost({
    slug: params?.slug,
    preview,
  });

  // Get similar posts using the Primary Category
  let primaryCategoryPosts = await getPosts({
    options: {
      "fields.primaryCategory.sys.id": post.primaryCategory.id,
      order: "-sys.createdAt",
    },
  });

  // Also look for the Primary Category in Other Categories of other posts
  let otherCategoryPosts = await getPosts({
    options: {
      "fields.otherCategories.sys.id": post.primaryCategory.id,
      order: "-sys.createdAt",
    },
  });

  // Filter out the current post so it doesn't show in results
  primaryCategoryPosts = primaryCategoryPosts.filter(
    (similarPost) => similarPost.id !== post.id,
  );

  otherCategoryPosts = otherCategoryPosts.filter(
    (similarPost) => similarPost.id !== post.id,
  );

  // Make sure we don't send duplicates
  const similarPosts = uniqBy(
    [...primaryCategoryPosts, ...otherCategoryPosts],
    "id",
  );

  // Categories
  const mergedOtherCategories = post.otherCategories
    ? [].concat(...post.otherCategories)
    : [];

  const categories = uniqBy(
    [post.primaryCategory, ...mergedOtherCategories].filter(
      (category) => category.slug !== BlogCategories.Featured,
    ),
    "id",
  );

  return {
    post,
    similarPosts,
    categories,
    preview,
  };
};

export const getStaticProps = makeGetStaticProps(getPostProps);

// eslint-disable-next-line require-await
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const posts = await getPosts({
    options: { "fields.redirect[exists]": false },
  });

  const paths = flatten(
    LOCALES.map((locale) => posts.map((post) => ({
        params: { category: post.primaryCategory.slug, slug: post.slug },
        locale,
      }))),
  );

  return {
    paths,
    fallback: true,
  };
};

// eslint-disable-next-line import/no-default-export
export default PostComponent;
