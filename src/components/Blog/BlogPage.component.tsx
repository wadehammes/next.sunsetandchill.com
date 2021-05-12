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
import { NavigationTheme } from "src/components/Navigation/Navigation.interfaces";

interface BlogPageProps extends PageProps {
  posts: BlogPostType[];
  categories: BlogCategoryType[];
}

export const BlogPage: FC<BlogPageProps> = ({
  posts,
  page,
  categories,
  navItems,
  footerProps,
}) =>
  page && (
    <PageStructure
      metadata={page?.metadata ?? {}}
      navProps={{
        navItems,
        navTheme: page?.navigationTheme ?? NavigationTheme.Dark,
        pageLimitedNav: page?.showLimitedNavigation ?? false,
      }}
      footerProps={footerProps}
    >
      <BlogPageHero metadata={page?.metadata ?? {}} categories={categories} />
      <BlogSection>
        <BlogPostCardGrid posts={posts} />
      </BlogSection>
      {page?.sections &&
        page.sections?.map((section: SectionType) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
    </PageStructure>
  );
