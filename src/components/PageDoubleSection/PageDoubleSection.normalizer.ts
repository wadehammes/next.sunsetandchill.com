import { Entry } from "src/interfaces/common.interfaces";
import { SectionDoubleWideType } from "src/components/PageDoubleSection/PageDoubleSection.interfaces";

export const normalizedSectionDoubleWide = (
  entry: Entry,
): SectionDoubleWideType => ({
    ...entry,
    sections: entry?.sections?.map((section: Entry) => section.sys.id) ?? [],
  });
