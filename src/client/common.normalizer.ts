import {
  MediaType,
  Entry,
  StaticEntry,
} from "src/interfaces/common.interfaces";

export const normalizedEntry = (entry: Entry): StaticEntry => ({
  id: entry.sys.id,
  slug: entry.fields.slug,
});

export const normalizedMedia = (entry: Entry): MediaType => ({
  id: entry.sys.id,
  ...entry.fields,
  file: {
    url: {
      en: entry.fields?.file?.en?.url ?? "",
      es: entry.fields?.file?.es?.url ?? entry.fields?.file?.en?.url ?? "",
    },
    details: {
      image: {
        width: {
          en: entry.fields?.file?.en?.details?.image?.width ?? null,
          es:
            entry.fields?.file?.es?.details?.image?.width ??
            entry.fields?.file?.en?.details?.image?.width ??
            null,
        },
        height: {
          en: entry.fields?.file?.en?.details?.image?.height ?? null,
          es:
            entry.fields?.file?.es?.details?.image?.height ??
            entry.fields?.file?.en?.details?.image?.height ??
            null,
        },
      },
    },
  },
  title: entry.fields?.title ?? "",
  description: entry.fields?.description ?? "",
});
