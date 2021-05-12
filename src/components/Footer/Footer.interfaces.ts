import { Document } from "@contentful/rich-text-types";
import { AddressLookupType } from "src/components/AddressLookup/AddressLookup.interfaces";
import { PageType } from "src/components/Page/Page.interfaces";
import {
  AllLanguageObject,
  ContentfulColors,
  LanguageEnglishObject,
  LanguageString,
  LinkTarget,
} from "src/interfaces/common.interfaces";

export interface FooterProps {
  pageLimitedNav?: boolean;
  footer: FooterType;
  addressLookupMetadata: AddressLookupType;
}

export interface NavExternalLink {
  id: number | string;
  linkTitle: LanguageString;
  linkUrl: string;
  linkTarget: LinkTarget;
}
export interface FooterNavBlockType {
  sys: {
    id: string;
  };
  id: string | number;
  navTitle: LanguageString;
  navLinks: PageType[];
  navExternalLinks: NavExternalLink[];
}

export interface FooterNavLinksType {
  fields: FooterNavBlockType[];
}

export interface SocialLinkType {
  socialChannelName: LanguageEnglishObject<string>;
  socialChannelUrl: LanguageEnglishObject<string>;
}

export interface SocialLinksType {
  fields: SocialLinkType;
}

export interface FooterType {
  footerBackgroundColor: ContentfulColors;
  footerNavBlocks: FooterNavBlockType[];
  showAddressLookup: boolean;
  showNewsletterSignUp: boolean;
  socialChannels: SocialLinkType[];
  footerContactInfo: AllLanguageObject<Document>;
  addressLookupMetadata: AddressLookupType;
  copyright: LanguageString;
}
