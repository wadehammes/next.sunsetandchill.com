import { CTAType } from "src/components/CTA/CTA.interfaces";
import {
  Alignment,
  MediaType,
  ContentfulColors,
  EntryId,
  LanguageString,
  BackgroundSizing,
} from "src/interfaces/common.interfaces";
import { AddressLookupType } from "src/components/AddressLookup/AddressLookup.interfaces";
import { LottieRendererTypes } from "src/components/LottieFile/LottieFile.interfaces";

export enum HeroSvgDesktopSize {
  Regular = "Regular",
  FullWidth = "Full Width",
}

export enum HeroTexasCityImage {
  Dallas = "Dallas",
  Houston = "Houston",
  Other = "Other",
}

export interface HeroType {
  id: EntryId;
  type: string;
  heroAlignment: Alignment;
  heroBackgroundColor: ContentfulColors;
  heroBackgroundImage: MediaType;
  heroBackgroundImageSizing: BackgroundSizing;
  heroBackgroundImagePadding: number;
  heroCta: CTAType;
  heroTitle: LanguageString;
  heroTitleColor: ContentfulColors;
  heroDescription: LanguageString;
  heroDescriptionColor: ContentfulColors;
  heroCopyAlignment: Alignment;
  heroSvgDesktop: MediaType;
  heroSvgDesktopSize: HeroSvgDesktopSize;
  heroSvgAboveContent: MediaType;
  heroLottieFile: MediaType;
  heroLottieHeight: number;
  heroLottieRendererType: LottieRendererTypes;
  addressLookup: boolean;
  addressLookupMetadata: AddressLookupType;
  showBreadcrumbs: boolean;
}
