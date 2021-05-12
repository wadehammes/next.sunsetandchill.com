import { Document } from "@contentful/rich-text-types";
import {
  Alignment,
  AllLanguageObject,
  LanguageString,
  MediaType,
  ContentStyleTypes,
  ContentfulColors,
  MediaFileType,
} from "src/interfaces/common.interfaces";
import { CTAType } from "src/components/CTA/CTA.interfaces";

export type CopyPlacement = Alignment.Left | Alignment.Right;

export type MediaAlignment = "Top" | Alignment.Center | "Bottom";

export type CopySpaceAllotment = 1 | 2 | 3;

export interface CopyMediaRowType {
  copy: AllLanguageObject<Document>;
  eyebrowCopy: LanguageString;
  eyebrowColor: ContentfulColors;
  copyPlacement: CopyPlacement;
  copyTextAlignment: Alignment;
  copySpaceAllotment: CopySpaceAllotment;
  copyCta: CTAType;
  media: MediaType;
  mediaType: MediaFileType;
  mediaAlignment: MediaAlignment;
  lottieFile: MediaType;
  lottieHeight: number;
  lottieWidth: number;
  style: ContentStyleTypes;
}
