import {
  EntryId,
  LanguageEnglishObject,
  LanguageString,
  MediaType,
} from "src/interfaces/common.interfaces";
import { SectionType } from "src/components/PageSection/PageSection.interfaces";
import { NavigationTheme } from "src/components/Navigation/Navigation.interfaces";
import { BannerType } from "src/components/Banner/Banner.interfaces";

export interface PageMetadataType {
  pageDisplayTitle: LanguageString;
  pageNavigationTitle: LanguageString;
  pageSubmenuTitle: LanguageString;
  pageKeyword: LanguageString;
  pageDescription: LanguageString;
  pageRobots: string;
  openGraphImage: MediaType;
}

export enum PageTypes {
  Regular = "Regular",
  Partner = "Partner",
  Electricity = "Electricity",
  Affiliate = "Affiliate",
  Versus = "Versus",
  LandingPage = "Landing Page",
}

export interface PageType {
  fields: {
    slug: LanguageEnglishObject<string>;
    title: LanguageString;
  };
  sys: {
    id: string;
  };
  id: EntryId;
  pageData: {
    createdAt: string;
    updatedAt: string;
    revisions: number;
  };
  title: LanguageString;
  slug: string;
  previewSlug: string;
  sections: SectionType[];
  subpages: PageType[];
  parentPage: string;
  navigationTheme: NavigationTheme;
  showLimitedNavigation: boolean;
  limitedNavAcquisitionPhoneNumber: string;
  hideSignUpButton?: boolean;
  additionalParamsForSignUpButton?: string;
  hideAllNavigation: boolean;
  enablePersistentNav?: boolean;
  metadata: PageMetadataType;
  pageCsvData: MediaType;
  pageType: PageTypes;
  redirect: PageType;
  pageBanner: BannerType;
}
