import { normalizedMedia } from "src/client/common.normalizer";
import {
  Alignment,
  BackgroundPositioning,
  BackgroundSizing,
  Entry,
  GridAlignment,
} from "src/interfaces/common.interfaces";
import {
  PageSectionLayoutTypes,
  PageSectionMediaTypes,
  PageSectionType,
  SectionContentPadding,
  SectionSize,
} from "src/components/PageSection/PageSection.interfaces";

export const normalizedPageSection = (entry: Entry): PageSectionType => ({
  ...entry,
  sectionId: entry?.sectionId?.en ?? "",
  sectionHeader: {
    en: entry?.sectionHeader?.en ?? "",
    es: entry?.sectionHeader?.es ?? "",
  },
  sectionHeaderMediaSeparator: entry?.sectionHeaderMediaSeparator?.en
    ? normalizedMedia(entry?.sectionHeaderMediaSeparator?.en)
    : null,
  sectionHeaderMediaAbove: entry?.sectionHeaderMediaAbove?.en
    ? normalizedMedia(entry?.sectionHeaderMediaAbove?.en)
    : null,
  sectionHeaderLottie: entry?.sectionHeaderLottie?.en
    ? normalizedMedia(entry?.sectionHeaderLottie?.en)
    : entry?.sectionHeaderLottie ?? null,
  sectionBackgroundImage: entry?.sectionBackgroundImage?.en
    ? normalizedMedia(entry?.sectionBackgroundImage?.en)
    : entry?.sectionBackgroundImage ?? null,
  sectionBackgroundImagePositioning:
    entry?.sectionBackgroundImagePositioning?.en ??
    BackgroundPositioning.Bottom,
  sectionBackgroundImageSizing:
    entry?.sectionBackgroundImageSizing?.en ?? BackgroundSizing.Contain,
  sectionBackgroundImagePadding: entry?.sectionBackgroundImagePadding?.en ?? 0,
  sectionHeaderLottieWidth: entry?.sectionHeaderLottieWidth?.en ?? 1440,
  sectionHeaderLottieHeight: entry?.sectionHeaderLottieHeight?.en ?? 540,
  sectionContentLayout:
    entry?.sectionContentLayout?.en ?? PageSectionLayoutTypes.Stacked,
  sectionContentLayoutPadding:
    entry?.sectionContentLayoutPadding?.en ?? SectionContentPadding.Regular,
  sectionContentLayoutGridAlignment:
    entry?.sectionContentLayoutGridAlignment?.en ?? GridAlignment.Stretched,
  sectionBackgroundColor: entry?.sectionBackgroundColor?.en ?? null,
  sectionHeaderAlignment: entry?.sectionHeaderAlignment?.en ?? Alignment.Center,
  sectionContent:
    entry?.sectionContent?.en.map((content: Entry) => content.sys.id) ?? null,
  sectionHeaderCta: {
    id: entry?.sectionHeaderCta?.en?.sys?.id ?? "",
  },
  sectionCta: {
    id: entry?.sectionCta?.en?.sys?.id ?? "",
  },
  sectionHeaderMediaStyle:
    entry?.sectionHeaderMediaStyle?.en ?? PageSectionMediaTypes.Regular,
  sectionSize: entry?.sectionSize?.en ?? PageSectionMediaTypes.Regular,
  sectionWidth: entry?.sectionWidth?.en ?? SectionSize.Regular,
  sectionVideo: entry?.sectionVideo?.en ?? null,
});
