import { createClient, CreateClientParams } from "contentful";
import { normalizedAddressLookupMetadata } from "src/components/AddressLookup/AddressLookup.normalizer";
import { normalizedCta } from "src/components/CTA/CTA.normalizer";
import { normalizedNavigation } from "src/components/Navigation/Navigation.normalizer";
import {
  normalizedPage,
  normalizedPageMetadata,
} from "src/components/Page/Page.normalizer";
import { normalizedFooter } from "src/components/Footer/Footer.normalizer";
import {
  Entry,
  EntryId,
  EntryTypes,
  Languages,
} from "src/interfaces/common.interfaces";
import {
  normalizedBlogCategory,
  normalizedBlogPage,
  normalizedBlogPost,
} from "src/components/Blog/Blog.normalizer";
import { normalizedMedia } from "src/client/common.normalizer";
import { PageSectionType } from "src/components/PageSection/PageSection.interfaces";
import memoize from "lodash.memoize";

interface Options {
  preview?: boolean;
}

export const initContentful = ({ preview }: Options = { preview: false }) => {
  const params: CreateClientParams = {
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: preview
      ? (process.env.CONTENTFUL_PREVIEW_TOKEN as string)
      : (process.env.CONTENTFUL_API_TOKEN as string),
    host: preview ? "preview.contentful.com" : "cdn.contentful.com",
  };

  return createClient(params);
};

// Contentful specific locales, not to be confused with our
// NextJS or i18n Languages
export type ContentfulLocales = "*" | Languages;

export interface EntriesParams {
  id?: string | string[] | number;
  type?: EntryTypes;
  slug?: string | string[];
  previewSlug?: string | string[];
  categoryId?: EntryId;
  locale?: ContentfulLocales;
  normalizer?: (entry: Entry) => void | Entry;
  options?: Record<string, unknown>;
  preview?: boolean;
}

export const getEntries = memoize(
  async ({ type, locale, normalizer, preview, options }: EntriesParams) => {
    const client = initContentful({ preview });

    const params = {
      content_type: type,
      locale,
      ...options,
    };

    const entries = await client.getEntries(params);

    return normalizer && entries?.items ? entries.items?.map(normalizer) : null;
  },
);

export const getEntry = memoize(
  async ({
    type,
    slug,
    previewSlug,
    locale,
    normalizer,
    preview,
    options,
  }: EntriesParams) => {
    const params = {
      content_type: type,
      locale,
      "fields.slug": slug,
      "fields.previewSlug": previewSlug,
      ...options,
    };
    const client = initContentful({ preview });

    const entries = await client.getEntries(params);

    return normalizer && entries?.items[0]
      ? normalizer(entries.items[0])
      : null;
  },
);

export const getEntryById = memoize(
  async ({
    type,
    id,
    locale,
    normalizer,
    options,
    preview = false,
  }: EntriesParams) => {
    const client = initContentful({ preview });

    const entries = await client.getEntries({
      content_type: type,
      locale,
      "sys.id": id,
      ...options,
    });

    return normalizer && entries?.items[0]
      ? normalizer(entries.items[0])
      : null;
  },
);

export const getEntryByIdOnly = memoize(
  async ({ id, options, preview = false }: EntriesParams) => {
    const client = initContentful({ preview });

    const entries = await client.getEntries({
      locale: "*",
      "sys.id": id,
      ...options,
    });

    return entries?.items[0] ?? null;
  },
);

export const getNavigation = memoize(
  async ({ slug, preview = false }: EntriesParams) => {
    const params: EntriesParams = {
      type: EntryTypes.ComponentNavigation,
      slug,
      locale: "*",
      preview,
      normalizer: normalizedNavigation,
    };

    const navigation = await getEntry(params);

    return navigation || [];
  },
);

export const getFooter = memoize(
  async ({ slug, preview = false }: EntriesParams) => {
    const params: EntriesParams = {
      type: EntryTypes.Footer,
      locale: "*",
      slug,
      preview,
      normalizer: normalizedFooter,
    };

    const footer = await getEntry(params);

    return footer || [];
  },
);

export const getPages = async ({ options, preview = false }: EntriesParams) => {
  const params: EntriesParams = {
    type: EntryTypes.Page,
    locale: "*",
    normalizer: normalizedPage,
    preview,
    options,
  };

  const pages = (await getEntries(params)) || [];

  return Promise.all(pages?.map((page) => buildPage(page, preview)));
};

export const getPage = async ({
  slug,
  options,
  preview = false,
}: EntriesParams) => {
  const params: EntriesParams = {
    type: EntryTypes.Page,
    locale: "*",
    normalizer: normalizedPage,
    slug,
    options,
    preview,
  };

  const page = await getEntry(params);

  return buildPage(page, preview);
};

export const getPageById = async ({
  id,
  options,
  preview = false,
}: EntriesParams) => {
  const params: EntriesParams = {
    type: EntryTypes.Page,
    locale: "*",
    normalizer: normalizedPage,
    id,
    preview,
    options,
  };

  const page = await getEntryById(params);

  return buildPage(page, preview);
};

export const getCtaById = async ({
  id,
  options,
  preview = false,
}: EntriesParams) => {
  const params: EntriesParams = {
    type: EntryTypes.ComponentCTA,
    locale: "*",
    normalizer: normalizedCta,
    id,
    preview,
    options,
  };

  const ctaById = await getEntryById(params);

  return ctaById || [];
};

export const getAddressLookupById = async ({
  id,
  options,
  preview = false,
}: EntriesParams) => {
  const params: EntriesParams = {
    type: EntryTypes.ComponentAddressLookup,
    locale: "*",
    normalizer: normalizedAddressLookupMetadata,
    id,
    preview,
    options,
  };

  const addressLookupById = await getEntryById(params);

  return addressLookupById || [];
};

export const getPageMetadataById = async ({
  id,
  options,
  preview = false,
}: EntriesParams) => {
  const params: EntriesParams = {
    type: EntryTypes.Metadata,
    locale: "*",
    normalizer: normalizedPageMetadata,
    id,
    preview,
    options,
  };

  const pageMetadataById = await getEntryById(params);

  return pageMetadataById || [];
};

// Blog
export const getPosts = async ({
  options = {},
  preview = false,
}: EntriesParams) => {
  const params: EntriesParams = {
    type: EntryTypes.BlogPost,
    locale: "*",
    normalizer: normalizedBlogPost,
    preview,
    options,
  };

  const posts = (await getEntries(params)) || [];

  return Promise.all(posts?.map((post) => buildPage(post, preview)));
};

export const getPost = async ({
  slug,
  options = {},
  preview = false,
}: EntriesParams) => {
  const params: EntriesParams = {
    type: EntryTypes.BlogPost,
    locale: "*",
    normalizer: normalizedBlogPost,
    slug,
    options,
    preview,
  };

  const post = (await getEntry(params)) || {};

  return buildPage(post, preview);
};

export const getPostById = async ({
  id,
  options,
  preview = false,
}: EntriesParams) => {
  const params: EntriesParams = {
    type: EntryTypes.BlogPost,
    locale: "*",
    normalizer: normalizedBlogPost,
    id,
    preview,
    options,
  };

  const post = await getEntryById(params);

  return buildPage(post, preview);
};

export const getCategories = async ({
  options = {},
  preview = false,
}: EntriesParams) => {
  const params: EntriesParams = {
    type: EntryTypes.BlogCategory,
    locale: "*",
    normalizer: normalizedBlogCategory,
    preview,
    options,
  };

  const categories = (await getEntries(params)) || [];

  return Promise.all(categories);
};

export const getCategory = async ({
  slug,
  options = {},
  preview = false,
}: EntriesParams) => {
  const params: EntriesParams = {
    type: EntryTypes.BlogCategory,
    locale: "*",
    normalizer: normalizedBlogCategory,
    slug,
    options,
    preview,
  };

  const category = (await getEntry(params)) || {};

  return category;
};

export const getBlogPage = async ({
  slug,
  options,
  preview = false,
}: EntriesParams) => {
  const params: EntriesParams = {
    type: EntryTypes.BlogPage,
    locale: "*",
    normalizer: normalizedBlogPage,
    slug,
    options,
    preview,
  };

  const page = await getEntry(params);

  return buildPage(page, preview);
};

const buildPage = async (page: Entry, preview: boolean = false) => {
  let pageSections = page?.sections ?? null;

  // If sections aren't included, just return the page.
  if (!pageSections) {
    return page;
  }

  const getContent = async (section: PageSectionType) => {
    const content = [];

    if (section?.sectionContent?.length) {
      for (const id of section?.sectionContent) {
        content.push(
          // eslint-disable-next-line no-await-in-loop
          id ? await getEntryByIdOnly({ id, preview }) : null,
        );
      }

      return Promise.all(content);
    }

    return null;
  };

  pageSections = pageSections?.map(async (section: Entry) => {
    const sectionContent = await getContent(section);

    // Object to store fetched fields to spread later
    const fields: Record<string, Entry> = {};

    // Fetch section header CTA if applicable
    if (section?.sectionHeaderCta?.id) {
      fields.sectionHeaderCta = await getCtaById({
        id: section.sectionHeaderCta.id,
        preview,
      });
    } else {
      fields.sectionHeaderCta = null;
    }

    // Fetch section end CTA if applicable
    if (section?.sectionCta?.id) {
      fields.sectionCta = await getCtaById({
        id: section.sectionCta.id,
        preview,
      });
    } else {
      fields.sectionCta = null;
    }

    // Fetch Hero fields
    if (section.type === EntryTypes.SectionHero) {
      fields.heroLottieFile = section?.heroLottieFile
        ? normalizedMedia(section?.heroLottieFile?.en)
        : null;

      if (section?.heroCta?.en) {
        fields.heroCta = await getCtaById({
          id: section?.heroCta.en.sys.id,
          preview,
        });
      } else {
        fields.heroCta = null;
      }

      if (section?.addressLookupMetadata?.en) {
        fields.addressLookupMetadata = await getAddressLookupById({
          id: section?.addressLookupMetadata.en.sys.id,
          preview,
        });
      } else {
        fields.addressLookupMetadata = null;
      }
    }

    // Fetch section header lottie files
    if (section?.sectionHeaderLottie) {
      fields.sectionHeaderLottie = section?.sectionHeaderLottie ?? null;
    }

    // Fetch double-wide section fields
    if (section.type === EntryTypes.SectionDoubleWide) {
      if (section?.sections?.en) {
        fields.doubleSections = section?.sections?.en.map(
          (entry: Entry) => entry.sys.id,
        );

        if (fields?.doubleSections) {
          const fetchSections = async () => {
            const fetchedSections = [];

            for (const id of fields.doubleSections) {
              fetchedSections.push(
                // eslint-disable-next-line no-await-in-loop
                id ? await getEntryByIdOnly({ id, preview }) : null,
              );
            }

            return Promise.all(fetchedSections);
          };

          fields.doubleSections = await fetchSections();
        }
      }

      // `await Promise.all(...)` should ensure that all promises resolved before continuing
      fields.doubleSections = await Promise.all(
        fields?.doubleSections.map(async (s: Entry) => {
          const fetchSectionContent = async () => {
            const fetchedSectionContent = [];

            // s.sectionContent is `undefined` (s is the whole Entry), so
            // find all section content ids  and map
            const sectionContentIds = s.fields.sectionContent?.en.map(
              (entry: Entry) => entry.sys.id,
            );

            if (sectionContentIds) {
              for (const id of sectionContentIds) {
                fetchedSectionContent.push(
                  // eslint-disable-next-line no-await-in-loop
                  id ? await getEntryByIdOnly({ id, preview }) : null,
                );
              }
            }

            return Promise.all(fetchedSectionContent);
          };

          const doubleSectionContent = await fetchSectionContent();

          return {
            ...s,
            sectionContent: doubleSectionContent || null,
          };
        }) ?? [],
      );
    }

    // Make sure fetched section data is in correct format
    const sanitizedContent =
      sectionContent?.map((content: Entry) => ({
        id: content?.sys.id ?? null,
        type: content?.sys.contentType.sys.id ?? null,
        fields: content?.fields ?? null,
      })) ?? [];

    const sanitizedDoubleContent =
      fields?.doubleSections?.map((content: Entry) => ({
        id: content?.sys.id ?? null,
        type: content?.sys.contentType.sys.id ?? null,
        fields: content?.fields ?? null,
      })) ?? [];

    return {
      ...section,
      ...fields,
      sectionContent: sanitizedContent,
      sections: sanitizedDoubleContent,
    };
  });

  pageSections = await Promise.all(pageSections);

  return {
    ...page,
    sections: pageSections,
  };
};
