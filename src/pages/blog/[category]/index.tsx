import flatten from "lodash.flatten";
import { GetStaticPaths } from "next";
import {
  getBlogPage,
  getCategories,
  getCategory,
  getPosts,
} from "src/client/index";
import { BlogCategoryType } from "src/components/Blog/Blog.interfaces";
import { LOCALES } from "src/utils/constants";
import {
  GetPostProps,
  makeGetStaticProps,
  CategoryPageComponent,
} from "src/utils/postHelpers";

const getCategoryPageProps: GetPostProps = async ({ params }) => {
  const category = await getCategory({ slug: params?.category });
  const page = await getBlogPage({ slug: "page-category-landing-page" });

  const posts = await getPosts({
    options: {
      "fields.primaryCategory.sys.id": category.id,
      order: "-sys.createdAt",
    },
  });

  const otherPosts = await getPosts({
    options: {
      "fields.otherCategories.sys.id": category.id,
      order: "-sys.createdAt",
    },
  });

  const uniquePosts = new Set([...posts, ...otherPosts]);

  return {
    page,
    post: {},
    category,
    posts: Array.from(uniquePosts),
  };
};

export const getStaticProps = makeGetStaticProps(getCategoryPageProps);

// eslint-disable-next-line require-await
export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories({});

  const paths = flatten(
    LOCALES.map((locale) => categories.map((category: BlogCategoryType) => ({
        params: { category: category.slug },
        locale,
      }))),
  );

  return {
    paths,
    fallback: false,
  };
};

// eslint-disable-next-line import/no-default-export
export default CategoryPageComponent;
