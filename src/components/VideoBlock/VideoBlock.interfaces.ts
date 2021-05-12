import { LanguageString } from "src/interfaces/common.interfaces";
import { SectionSize } from "src/components/PageSection/PageSection.interfaces";

export interface VideoBlockType {
  videoUrl: string;
  videoCaption: LanguageString;
  videoSpacing: SectionSize;
}

export interface VideoBlockProps {
  fields: VideoBlockType;
  lightVariant?: boolean;
}
