import { FC, useEffect, useMemo, useState } from "react";
import { Blog, WithContext } from "schema-dts";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Languages } from "src/interfaces/common.interfaces";
import {
  BlogPostMetadataType,
  BlogPostProps,
} from "src/components/Blog/Blog.interfaces";
import { SectionType } from "src/components/PageSection/PageSection.interfaces";
import { normalizedBlogHeroData } from "src/components/Blog/Blog.normalizer";
import { BlogPostCopy } from "src/components/Blog/BlogPostCopy.component";
import { BlogPostHero } from "src/components/Blog/BlogPostHero.component";
import { SectionRenderer } from "src/components/SectionRenderer/SectionRenderer.component";
import { PageStructure } from "src/components/PageStructure/PageStructure.component";
import Head from "next/head";
import { convertRelativeUrl } from "src/utils/helpers";

const PageLoading = dynamic(() =>
  import("src/components/PageLoading/PageLoading.component"),
);

const BlogPostSimilarPosts = dynamic(() =>
  import("src/components/Blog/BlogPostSimilarPosts.component"),
);

const BlogShare = dynamic(() =>
  import("src/components/Blog/BlogShare.component"),
);

const BlogSections = styled.div`
  position: relative;
  z-index: 11;
`;

export const BlogPost: FC<BlogPostProps> = ({
  post,
  similarPosts = [],
  categories = [],
  navItems,
  footerProps,
}) => {
  const [postSchema, setPostSchema] = useState<WithContext<Blog>>();
  const { inView, ref } = useInView({
    threshold: 0.3,
  });
  const { asPath, locale } = useRouter();

  // If default metadata fields aren't filled out in Contentful,
  // let's set them with blog post data
  const postMetadata: BlogPostMetadataType = useMemo(() => {
    const blogPostMetadata = post?.blogPostMetadata ?? {};

    return {
      ...blogPostMetadata,
      openGraphImage:
        blogPostMetadata?.openGraphImage ?? post?.blogPostImage ?? null,
      pageKeyword:
        blogPostMetadata?.pageKeyword ??
        post?.blogTags[locale as Languages]?.map((tag) => tag).join(",") ??
        null,
      pageDescription:
        blogPostMetadata?.pageDescription ?? post?.blogPostExcerpt ?? null,
    };
  }, [post, locale]);

  useEffect(() => {
    setPostSchema({
      "@context": "https://schema.org",
      "@type": "Blog",
      headline: post.blogPostTitle[locale as Languages],
      description: postMetadata?.pageDescription[locale as Languages] ?? "",
      dateCreated: post.blogPostData.createdAt,
      datePublished: post.blogPostData.createdAt,
      dateModified: post.blogPostData.updatedAt,
      inLanguage: locale,
      isFamilyFriendly: true,
      copyrightYear: new Date(post.blogPostData.createdAt).getFullYear(),
      copyrightHolder: "",
      author: {
        "@type": "Person",
        name: post.blogPostAuthor.authorName.trim(),
      },
      creator: {
        "@type": "Person",
        name: post.blogPostAuthor.authorName.trim(),
      },
      publisher: {
        "@type": "Organization",
        name: "Rhythm Energy",
        url: "https://www.gotrhythm.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.gotrhythm.com/public/logo/rhythm-logo-311x120.png",
          width: "311",
          height: "120",
        },
      },
      mainEntityOfPage: `https://www.gotrhythm.com/blog/${post.primaryCategory.slug}/${post.slug}`,
      keywords:
        post?.blogTags[locale as Languages].map((tag) => tag.trim()) ?? [],
      genre: [post.primaryCategory.categoryName[locale as Languages]],
      image: post.blogPostImage
        ? {
            "@type": "ImageObject",
            url: convertRelativeUrl(
              post.blogPostImage.file.url[locale as Languages],
            ),
            height: `${
              post.blogPostImage.file.details.image.height[locale as Languages]
            }`,
            width: `${
              post.blogPostImage.file.details.image.width[locale as Languages]
            }`,
          }
        : undefined,
    });
  }, [post, locale, postMetadata]);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
        />
      </Head>
      <PageStructure
        metadata={postMetadata}
        navProps={{
          navItems,
          pageLimitedNav: false,
        }}
        footerProps={footerProps}
      >
        <PageLoading />
        {post && (
          <>
            <BlogShare
              url={`https://www.gotrhythm.com${asPath}`}
              title={post.blogPostTitle[locale as Languages]}
              description={post.blogPostExcerpt[locale as Languages]}
              hashtag={`#${post.primaryCategory.slug.replace("-", "")}`}
              hashtags={[
                `${post.primaryCategory.slug.replace("-", "")}`,
                "rhythmenergy",
              ]}
              visible={!inView}
            />
            <BlogPostHero hero={normalizedBlogHeroData(post)} />
            <BlogPostCopy
              post={post.blogPost}
              author={post.blogPostAuthor}
              tags={post.blogTags[locale as Languages]}
              categories={categories}
            />
            {similarPosts && similarPosts.length >= 2 && (
              <BlogPostSimilarPosts
                posts={similarPosts}
                title={post.similarPostsTitle}
              />
            )}
            <BlogSections ref={ref}>
              {post?.sections &&
                post.sections?.map((section: SectionType) => (
                  <SectionRenderer key={section.id} section={section} />
                ))}
            </BlogSections>
          </>
        )}
      </PageStructure>
    </>
  );
};
