import { normalizedMedia } from "src/client/common.normalizer";
import {
  Alignment,
  ContentfulColors,
  ContentStyleTypes,
  Entry,
  MediaFileType,
} from "src/interfaces/common.interfaces";
import { CopyMediaRowType } from "./CopyMediaRow.interfaces";

export const normalizedCopyMediaRow = (entry: Entry): CopyMediaRowType => ({
  ...entry,
  copy: {
    en: entry?.copy?.en ?? "",
    es: entry?.copy?.es ?? entry?.copy?.en ?? "",
  },
  eyebrowCopy: {
    en: entry?.eyebrowCopy?.en ?? "",
    es: entry?.eyebrowCopy?.es ?? entry?.eyebrowCopy?.en ?? "",
  },
  eyebrowColor: entry?.eyebrowColor?.en ?? ContentfulColors.BrightPurple,
  media: entry?.media?.en ? normalizedMedia(entry.media.en) : null,
  mediaType: entry?.mediaType?.en ?? MediaFileType.Image,
  lottieFile: entry?.lottieFile?.en
    ? normalizedMedia(entry.lottieFile.en)
    : null,
  lottieHeight: entry?.lottieHeight?.en ?? 300,
  lottieWidth: entry?.lottieWidth?.en ?? 300,
  mediaAlignment: entry?.mediaAlignment?.en ?? Alignment.Center,
  copyPlacement: entry?.copyPlacement?.en ?? Alignment.Left,
  copySpaceAllotment: entry?.copySpaceAllotment?.en ?? 1,
  copyTextAlignment: entry?.copyTextAlignment?.en ?? Alignment.Left,
  copyCta: entry?.copyCta?.en ?? null,
  style: entry?.style?.en ?? ContentStyleTypes.None,
});
