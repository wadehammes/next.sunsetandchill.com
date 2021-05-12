import uniqBy from "lodash.uniqby";
import { getPostById, getPosts } from "src/client/index";
import { BlogCategories } from "src/components/Blog/Blog.interfaces";
import {
  GetPostProps,
  makeGetStaticProps,
  PreviewPostComponent,
} from "src/utils/postHelpers";

type PreviewDataType = {
  id: string | number;
};

const getPostProps: GetPostProps = async ({ previewData, preview = false }) => {
  let similarPosts = [];
  let categories = [];

  const previewDataObject: PreviewDataType = previewData as PreviewDataType;

  const post =
    previewDataObject?.id && preview
      ? await getPostById({
          id: previewDataObject.id,
          preview,
        })
      : null;

  if (post) {
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
    similarPosts = uniqBy(
      [...primaryCategoryPosts, ...otherCategoryPosts],
      "id",
    );

    // Categories
    const mergedOtherCategories = post.otherCategories
      ? [].concat(...post.otherCategories)
      : [];

    categories = uniqBy(
      [post.primaryCategory, ...mergedOtherCategories].filter(
        (category) => category.slug !== BlogCategories.Featured,
      ),
      "id",
    );
  }

  return {
    post,
    similarPosts,
    categories,
  };
};

export const getStaticProps = makeGetStaticProps(getPostProps);

// eslint-disable-next-line import/no-default-export
export default PreviewPostComponent;
