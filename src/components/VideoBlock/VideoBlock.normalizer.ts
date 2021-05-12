import { Entry } from "src/interfaces/common.interfaces";
import { VideoBlockType } from "src/components/VideoBlock/VideoBlock.interfaces";
import { SectionSize } from "src/components/PageSection/PageSection.interfaces";

export const normalizedVideoBlock = (entry: Entry): VideoBlockType => ({
  ...entry.fields,
  videoUrl: entry.fields?.videoUrl?.en ?? null,
  videoSpacing: entry.fields?.videoSpacing?.en ?? SectionSize.Regular,
});
