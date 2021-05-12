import {
  ContentfulColors,
  LanguageString,
  LinkTarget,
} from "src/interfaces/common.interfaces";

export interface BannerType {
  bannerText: LanguageString;
  bannerId: string;
  bannerUrl: string;
  bannerLinkTarget: LinkTarget;
  bannerColor: ContentfulColors;
  bannerTextColor: ContentfulColors;
}
