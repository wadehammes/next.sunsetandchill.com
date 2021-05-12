import { Document } from "@contentful/rich-text-types";
import {
  AllLanguageObject,
  EntryId,
  LanguageString,
  MediaType,
} from "src/interfaces/common.interfaces";
import { FooterType } from "src/components/Footer/Footer.interfaces";
import { AddressLookupType } from "src/components/AddressLookup/AddressLookup.interfaces";
import { NavigationType } from "src/components/Navigation/Navigation.interfaces";
import { SectionType } from "src/components/PageSection/PageSection.interfaces";
import {
  ButtonSizes,
  ButtonStyleTypes,
} from "src/components/Button/Button.interfaces";

export enum BlogCategories {
  Uncategorized = "uncategorized",
  Featured = "featured",
}

export interface BlogPostProps {
  post: BlogPostType;
  similarPosts?: BlogPostType[];
  categories?: BlogCategoryType[];
  navItems: NavigationType;
  footerProps: {
    footer: FooterType;
    addressLookupMetadata: AddressLookupType;
  };
}

export interface BlogPostMetadataType {
  pageDisplayTitle: LanguageString;
  pageNavigationTitle: LanguageString;
  pageKeyword: LanguageString | string;
  pageDescription: LanguageString;
  pageRobots: string;
  openGraphImage: MediaType;
}

export interface BlogCategoryType {
  id: EntryId;
  categoryName: LanguageString;
  slug: string;
  metadata: BlogPostMetadataType;
}

export interface BlogAuthorType {
  authorName: string;
  authorSlug: string;
  authorBio: AllLanguageObject<Document>;
  authorLink: string;
  authorHeadshot: MediaType;
  authorPosition: LanguageString;
  authorBlockTitle: LanguageString;
}

export interface BlogPostDataType {
  createdAt: string;
  updatedAt: string;
  revision: number;
}

export type BlogPostCopyType = AllLanguageObject<Document>;

export interface BlogPostHeroType {
  title: AllLanguageObject<string>;
  image: MediaType;
  author: BlogAuthorType;
  postData: BlogPostDataType;
  primaryCategory: BlogCategoryType;
  publishedDate: string;
}

export interface BlogCardCTAType {
  buttonText: AllLanguageObject<string>;
  buttonStyle: ButtonStyleTypes;
  buttonSize: ButtonSizes;
}

export interface BlogPostType {
  id: EntryId;
  blogPostData: BlogPostDataType;
  blogPostTitle: LanguageString;
  slug: string;
  blogPostImage: MediaType;
  blogPost: BlogPostCopyType;
  blogPostExcerpt: AllLanguageObject<string>;
  blogPostAuthor: BlogAuthorType;
  blogCardCta: BlogCardCTAType;
  primaryCategory: BlogCategoryType;
  otherCategories: BlogCategoryType[];
  blogTags: {
    en: string[];
    es: string[];
  };
  blogPostPublishedDate: string;
  blogPostMetadata: BlogPostMetadataType;
  sections: SectionType[];
  showLimitedNavigation: boolean;
  similarPostsTitle: LanguageString;
}
