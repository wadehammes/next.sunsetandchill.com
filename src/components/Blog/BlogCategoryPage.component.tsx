import { FC } from "react";
import { PageProps } from "src/components/Page/Page.component";
import {
  BlogCategoryType,
  BlogPostType,
} from "src/components/Blog/Blog.interfaces";
import { SectionType } from "src/components/PageSection/PageSection.interfaces";
import { SectionRenderer } from "src/components/SectionRenderer/SectionRenderer.component";
import { PageStructure } from "src/components/PageStructure/PageStructure.component";
import { BlogPageHero } from "src/components/Blog/BlogPageHero.component";
import { BlogPostCardGrid } from "src/components/Blog/BlogPostCardGrid.component";
import { BlogSection } from "src/components/Blog/BlogSection.component";
import dynamic from "next/dynamic";
import { NavigationTheme } from "src/components/Navigation/Navigation.interfaces";

const PageLoading = dynamic(() =>
  import("src/components/PageLoading/PageLoading.component"),
);

interface BlogCategoryPageProps extends PageProps {
  posts: BlogPostType[];
  category: BlogCategoryType;
}

export const BlogCategoryPage: FC<BlogCategoryPageProps> = ({
  posts,
  page,
  category,
  navItems,
  footerProps,
}) => (
  <PageStructure
    metadata={category?.metadata ?? {}}
    navProps={{
      navItems,
      navTheme: page?.navigationTheme ?? NavigationTheme.Dark,
      pageLimitedNav: page?.showLimitedNavigation ?? false,
    }}
    footerProps={footerProps}
  >
    <PageLoading />
    {posts && category && (
      <>
        <BlogPageHero
          metadata={category?.metadata ?? {}}
          description={category?.metadata?.pageDescription ?? ""}
        />
        <BlogSection>
          <BlogPostCardGrid posts={posts} />
        </BlogSection>
      </>
    )}
    {page?.sections &&
      page.sections?.map((section: SectionType) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
  </PageStructure>
);
