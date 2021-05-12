import { normalizedMedia } from "src/client/common.normalizer";
import {
  Alignment,
  BackgroundSizing,
  ContentfulColors,
  Entry,
} from "src/interfaces/common.interfaces";
import {
  HeroSvgDesktopSize,
  HeroType,
} from "src/components/Hero/Hero.interfaces";
import { LottieRendererTypes } from "src/components/LottieFile/LottieFile.interfaces";

export const normalizedHero = (entry: Entry): HeroType => ({
  id: entry.id,
  ...entry,
  heroBackgroundColor:
    entry?.heroBackgroundColor?.en ?? ContentfulColors.Transparent,
  heroBackgroundImage: entry?.heroBackgroundImage?.en
    ? normalizedMedia(entry?.heroBackgroundImage?.en)
    : null,
  heroBackgroundImageSizing:
    entry?.heroBackgroundImageSizing?.en ?? BackgroundSizing.Cover,
  heroBackgroundImagePadding: entry?.heroBackgroundImagePadding?.en ?? 0,
  heroTitleColor: entry?.heroTitleColor?.en ?? null,
  heroDescriptionColor: entry?.heroDescriptionColor?.en ?? null,
  heroAlignment: entry?.heroAlignment?.en ?? Alignment.Left,
  heroSvgDesktop: entry?.heroSvgDesktop?.en
    ? normalizedMedia(entry?.heroSvgDesktop?.en)
    : null,
  heroSvgAboveContent: entry?.heroSvgAboveContent?.en
    ? normalizedMedia(entry?.heroSvgAboveContent?.en)
    : null,
  heroSvgDesktopSize:
    entry?.heroSvgDesktopSize?.en ?? HeroSvgDesktopSize.Regular,
  heroLottieFile: entry?.heroLottieFile?.en
    ? normalizedMedia(entry?.heroLottieFile?.en)
    : entry?.heroLottieFile ?? null,
  heroLottieHeight: entry?.heroLottieHeight?.en ?? 540,
  heroLottieRendererType:
    entry?.heroLottieRendererType?.en ?? LottieRendererTypes.Canvas,
  addressLookup: entry?.addressLookup?.en ?? false,
  showBreadcrumbs: entry?.showBreadcrumbs?.en ?? false,
});
