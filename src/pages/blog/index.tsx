import { getBlogPage, getPosts } from "src/client/index";
import {
  GetPostProps,
  makeGetStaticProps,
  BlogPageComponent,
} from "src/utils/postHelpers";
import uniqBy from "lodash.uniqby";
import { BlogCategories } from "src/components/Blog/Blog.interfaces";

const getBlogPageProps: GetPostProps = async () => {
  const page = await getBlogPage({ slug: "blog" });

  const posts = await getPosts({
    options: { order: "-sys.createdAt" },
  });

  const primaryCategories = posts.map((post) => post.primaryCategory);
  const otherCategories = posts.map((post) => post.otherCategories);
  const mergedOtherCategories = [].concat(...otherCategories);

  const categories = uniqBy(
    [...primaryCategories, ...mergedOtherCategories].filter(
      (category) => category.slug !== BlogCategories.Featured,
    ),
    "id",
  );

  return {
    page,
    categories,
    posts,
  };
};

export const getStaticProps = makeGetStaticProps(getBlogPageProps);

// eslint-disable-next-line import/no-default-export
export default BlogPageComponent;
