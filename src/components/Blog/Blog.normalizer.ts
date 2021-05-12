import { normalizedMedia } from "src/client/common.normalizer";
import { Entry } from "src/interfaces/common.interfaces";
import { normalizedPageSection } from "src/components/PageSection/PageSection.normalizer";
import {
  BlogCardCTAType,
  BlogCategories,
  BlogCategoryType,
  BlogPostHeroType,
  BlogPostType,
} from "src/components/Blog/Blog.interfaces";
import { normalizedPageMetadata } from "src/components/Page/Page.normalizer";
import {
  ButtonSizes,
  ButtonStyleTypes,
} from "src/components/Button/Button.interfaces";
import { capitalizeWords } from "src/utils/helpers";

export const normalizedBlogPost = (post: Entry): BlogPostType => ({
  id: post.sys.id,
  blogPostData: {
    createdAt: post.sys.createdAt,
    updatedAt: post.sys.updatedAt,
    revision: post.sys.revision,
  },
  ...post.fields,
  blogPostAuthor: post?.fields?.blogPostAuthor?.en
    ? {
        authorName:
          post?.fields?.blogPostAuthor?.en?.fields?.authorName?.en ?? null,
        authorSlug:
          post?.fields?.blogPostAuthor?.en?.fields?.authorSlug?.en ?? null,
        authorBio: post?.fields?.blogPostAuthor?.en?.fields?.authorBio ?? null,
        authorLink:
          post?.fields?.blogPostAuthor?.en?.fields?.authorLink?.en ?? null,
        authorHeadshot: post?.fields?.blogPostAuthor?.en?.fields?.authorHeadshot
          ?.en?.sys
          ? normalizedMedia(
              post?.fields?.blogPostAuthor?.en?.fields?.authorHeadshot?.en,
            )
          : null,
        authorPosition:
          post?.fields?.blogPostAuthor?.en?.fields?.authorPosition ?? null,
      }
    : null,
  blogPostImage: post?.fields?.blogPostImage?.en?.sys
    ? normalizedMedia(post?.fields?.blogPostImage?.en)
    : null,
  slug: post?.fields?.slug?.en ?? null,
  primaryCategory: normalizedBlogCategory(
    post?.fields?.primaryCategory?.en,
  ) ?? {
    categoryName: capitalizeWords(BlogCategories.Uncategorized),
    slug: BlogCategories.Uncategorized,
  },
  otherCategories:
    post?.fields?.otherCategories?.en.map(normalizedBlogCategory) ?? null,
  blogTags: {
    en: post?.fields?.blogTags?.en?.map((tag: string) => tag) ?? null,
    es:
      post?.fields?.blogTags?.en?.map((tag: string) => tag) ??
      post?.fields?.blogTags?.es?.map((tag: string) => tag) ??
      null,
  },
  blogPostMetadata:
    normalizedPageMetadata(post?.fields?.blogPostMetadata?.en) ?? null,
  blogPostPublishedDate:
    post?.fields?.blogPostPublishedDate?.en ?? post?.sys?.createdAt,
  sections:
    post.fields?.sections?.en?.map((section: Entry) => ({
      ...normalizedPageSection(section.fields),
      type: section.sys?.contentType?.sys?.id ?? null,
      id: section.sys.id,
    })) ?? null,
  blogCardCta: post.fields?.blogCardCta?.en
    ? normalizedBlogCardCTA(post.fields.blogCardCta.en)
    : null,
  blogPostExcerpt: {
    en: post.fields?.blogPostExcerpt?.en ?? "",
    es: post.fields?.blogPostExcerpt?.es ?? "",
  },
  blogPost: {
    en: post.fields?.blogPost?.en,
    es: post.fields?.blogPost?.es ?? post.fields?.blogPost.en,
  },
  showLimitedNavigation: false,
  similarPostsTitle: {
    en: "Similar Articles",
    es: "Artículos similares",
  },
});

export const normalizedBlogCategory = (category: Entry): BlogCategoryType => ({
  id: category?.sys?.id ?? null,
  ...category.fields,
  slug: category?.fields?.slug?.en ?? null,
  metadata: category?.fields?.metadata?.en?.fields ?? null,
});

export const normalizedBlogHeroData = (
  post: BlogPostType,
): BlogPostHeroType => ({
  title: post?.blogPostTitle ?? null,
  image: post?.blogPostImage ?? null,
  author: post?.blogPostAuthor ?? null,
  postData: post?.blogPostData ?? null,
  publishedDate: post?.blogPostPublishedDate ?? null,
  primaryCategory: post?.primaryCategory ?? null,
});

export const normalizedBlogCardCTA = (cta: Entry): BlogCardCTAType => ({
  ...cta.fields,
  buttonStyle: cta.fields?.buttonStyle?.en ?? ButtonStyleTypes.Primary,
  buttonSize: cta.fields?.buttonSize?.en ?? ButtonSizes.Small,
});

export const normalizedBlogPage = (page: Entry) => ({
  id: page?.sys?.id ?? "",
  ...page.fields,
  sections:
    page.fields?.sections?.en?.map((section: Entry) => ({
      ...normalizedPageSection(section.fields),
      id: section.sys?.id ?? "",
      type: section.sys?.contentType?.sys?.id ?? null,
    })) ?? null,
  showFeaturedArticles: page.fields?.showFeaturedArticles?.en ?? false,
  featuredArticleCategory: page.fields?.featuredArticleCategory?.en
    ? normalizedBlogCategory(page.fields?.featuredArticleCategory?.en)
    : null,
  slug: page.fields?.slug?.en ?? "",
  previewSlug: page.fields?.previewSlug?.en ?? "",
  metadata: page.fields?.metadata?.en?.fields
    ? normalizedPageMetadata(page.fields?.metadata?.en)
    : page.fields?.metadata?.en?.sys.id ?? null,
});
