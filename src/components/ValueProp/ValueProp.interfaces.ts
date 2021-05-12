import { Document } from "@contentful/rich-text-types";
import {
  Alignment,
  AllLanguageObject,
  ContentStyleTypes,
  MediaType,
} from "src/interfaces/common.interfaces";
import { CTAType } from "src/components/CTA/CTA.interfaces";

export interface ValuePropType {
  icon: MediaType;
  iconLottieFile: MediaType;
  copy: AllLanguageObject<Document>;
  cta: CTAType;
  style: ContentStyleTypes;
  alignment: Alignment;
}
