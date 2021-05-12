import {
  ContentfulColors,
  Entry,
  LinkTarget,
} from "src/interfaces/common.interfaces";
import { BannerType } from "src/components/Banner/Banner.interfaces";

export const normalizedBanner = (entry: Entry): BannerType => ({
  ...entry.fields,
  bannerId: entry?.fields?.bannerId?.en ?? "",
  bannerUrl: entry?.fields?.bannerUrl?.en ?? null,
  bannerLinkTarget: entry?.fields?.bannerLinkTarget?.en ?? LinkTarget.Self,
  bannerColor: entry?.fields?.bannerColor?.en ?? ContentfulColors.Red,
  bannerTextColor: entry?.fields?.bannerTextColor?.en ?? ContentfulColors.White,
});
