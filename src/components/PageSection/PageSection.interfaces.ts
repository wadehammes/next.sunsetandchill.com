import { Document } from "@contentful/rich-text-types";
import { AddressLookupType } from "src/components/AddressLookup/AddressLookup.interfaces";
import { CopyMediaRowType } from "src/components/CopyMediaRow/CopyMediaRow.interfaces";
import { CTAType } from "src/components/CTA/CTA.interfaces";
import { ValuePropType } from "src/components/ValueProp/ValueProp.interfaces";
import {
  Alignment,
  AllLanguageObject,
  BackgroundPositioning,
  BackgroundSizing,
  ContentfulColors,
  EntryId,
  EntryTypes,
  GridAlignment,
  MediaType,
} from "src/interfaces/common.interfaces";
import { HeroType } from "src/components/Hero/Hero.interfaces";
import { CustomerReviewCarouselType } from "src/components/CustomerReviewCarousel/CustomerReviewCarousel.interfaces";
import { RichTextNodeType } from "contentful";
import { ComparisonTableType } from "src/components/ComparisonTable/ComparisonTable.interfaces";

export enum PageSectionMediaTypes {
  FullWidth = "Full Width",
  Regular = "Regular",
}

export enum PageSectionLayoutTypes {
  CardGrid = "Card Grid - 3x3",
  Grid2x2 = "Grid - 2x2",
  Grid3x3 = "Grid - 3x3",
  Grid4x4 = "Grid - 4x4",
  LogoGrid4x4 = "Logo Grid - 4x4",
  Stacked = "Stacked",
  StackedNoGridGap = "Stacked w/ No Gap",
}

export interface SectionType {
  sys: {
    id: string;
    contentType: {
      sys: {
        id: string;
      };
    };
  };
  id: EntryId;
  type: EntryTypes;
  fields:
    | ValuePropType
    | RichTextNodeType
    | CopyMediaRowType
    | HeroType
    | AddressLookupType
    | CustomerReviewCarouselType
    | ComparisonTableType
    | PageSectionType;
}

export interface SectionsType {
  id: EntryId;
  sections: SectionType[];
}

export enum SectionSize {
  Regular = "Regular",
  NoTopPadding = "No Top Padding",
  NoPadding = "No Padding",
  FullWidth = "Full Width",
}

export enum SectionContentPadding {
  NoPadding = "No Padding",
  Regular = "Regular",
}

export interface PageSectionType {
  id: EntryId;
  sectionId: string;
  sectionHeader: AllLanguageObject<Document>;
  sectionHeaderCta: CTAType;
  sectionCta: CTAType;
  sectionBackgroundImage: MediaType;
  sectionBackgroundImagePositioning: BackgroundPositioning;
  sectionBackgroundImageSizing: BackgroundSizing;
  sectionBackgroundImagePadding: number;
  sectionHeaderMediaAbove: MediaType;
  sectionHeaderMediaSeparator: MediaType;
  sectionHeaderMediaStyle: PageSectionMediaTypes;
  sectionHeaderLottie: MediaType;
  sectionHeaderLottieWidth: number;
  sectionHeaderLottieHeight: number;
  sectionContentLayout: PageSectionLayoutTypes;
  sectionContentLayoutPadding: SectionContentPadding;
  sectionContentLayoutGridAlignment: GridAlignment;
  sectionContent: string[];
  sectionBackgroundColor: ContentfulColors;
  sectionHeaderAlignment: Alignment;
  sectionSize: SectionSize;
  sectionWidth: SectionSize;
  sectionVideo: string;
}
