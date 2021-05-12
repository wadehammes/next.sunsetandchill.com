import {
  ContentfulColors,
  EntryId,
  LanguageString,
  MediaType,
} from "src/interfaces/common.interfaces";
import { PageType } from "src/components/Page/Page.interfaces";
import { BannerType } from "src/components/Banner/Banner.interfaces";

export enum NavigationTheme {
  Light = "Light",
  Dark = "Dark",
}

export interface NavigationType {
  id: EntryId;
  slug: LanguageString;
  title: string;
  logo: MediaType;
  loginButtonText: LanguageString;
  loginButtonUrl: string;
  showLanguageSelectMenu: boolean;
  pages: PageType[];
  showSignUpButton: boolean;
  signUpButtonText: LanguageString;
  signUpButtonUrl: string;
  rhythmEmail: string;
  rhythmPhone: string;
  rhythmDigitalCampaignPhone: string;
  banner: BannerType;
  showPhoneNumber: boolean;
}

export interface NavProps {
  navItems: NavigationType;
  navTheme?: NavigationTheme;
  pageLimitedNav?: boolean;
  pageLimitedNavPhone?: string;
  pageHideAllNav?: boolean;
  pageHideSignUpButton?: boolean;
  pageSignUpParams?: string;
  pagePersistentNav?: boolean;
  pageBanner?: BannerType;
  overrideNavBackground?: ContentfulColors | null;
  preview?: boolean;
}

export interface UINavProps {
  preview?: boolean;
  hideNav?: boolean;
  navTheme?: NavigationTheme;
  backgroundColor?: ContentfulColors;
}
