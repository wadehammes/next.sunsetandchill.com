import { Entry } from "src/interfaces/common.interfaces";
import {
  PageMetadataType,
  PageType,
  PageTypes,
} from "src/components/Page/Page.interfaces";
import { normalizedMedia } from "src/client/common.normalizer";
import { normalizedPageSection } from "src/components/PageSection/PageSection.normalizer";
import { NavigationTheme } from "src/components/Navigation/Navigation.interfaces";
import { normalizedBanner } from "src/components/Banner/Banner.normalizer";

export const normalizedPage = (entry: Entry): PageType => {
  const subpages =
    entry?.fields?.subpages?.en?.map((page: PageType) => {
      if (page.fields) {
        return {
          id: page?.sys?.id ?? "",
          slug: `${entry.fields.slug.en}/${page.fields.slug.en}`,
          title: page?.fields?.title ?? "",
        };
      } else {
        return {
          id: page?.sys?.id ?? "",
        };
      }
    }) ?? null;

  return {
    id: entry?.sys?.id ?? "",
    pageData: {
      createdAt: entry?.sys?.createdAt,
      updatedAt: entry?.sys?.updatedAt,
      revisions: entry?.sys?.revision,
    },
    ...entry.fields,
    sections:
      entry.fields?.sections?.en?.map((section: Entry) => ({
        ...normalizedPageSection(section.fields),
        id: section.sys?.id ?? "",
        type: section.sys?.contentType?.sys?.id ?? null,
      })) ?? null,
    subpages,
    slug: entry.fields?.slug?.en ?? "",
    previewSlug: entry.fields?.previewSlug?.en ?? "",
    parentPage: entry.fields?.parentPage
      ? entry.fields?.parentPage?.en?.fields?.slug?.en ?? ""
      : "",
    showLimitedNavigation: entry.fields?.showLimitedNavigation?.en ?? false,
    limitedNavAcquisitionPhoneNumber:
      entry.fields?.limitedNavAcquisitionPhoneNumber?.en ?? null,
    hideSignUpButton: entry.fields?.hideSignUpButton?.en ?? false,
    additionalParamsForSignUpButton:
      entry.fields?.additionalParamsForSignUpButton?.en ?? "",
    hideAllNavigation: entry.fields?.hideAllNavigation?.en ?? false,
    navigationTheme: entry.fields?.navigationTheme?.en ?? NavigationTheme.Dark,
    enablePersistentNav: entry.fields?.enablePersistentNav?.en ?? false,
    metadata: entry.fields?.metadata?.en?.fields
      ? normalizedPageMetadata(entry.fields?.metadata?.en)
      : entry.fields?.metadata?.en?.sys.id ?? null,
    pageCsvData: entry.fields?.pageCsvData?.en?.fields?.file?.en?.url ?? "",
    pageType: entry.fields?.pageType?.en ?? PageTypes.Regular,
    redirect: entry.fields?.redirect?.en
      ? normalizedPage(entry.fields?.redirect?.en)
      : false,
    pageBanner: entry.fields?.pageBanner?.en
      ? normalizedBanner(entry.fields?.pageBanner?.en)
      : null,
  };
};

export const normalizedPageMetadata = (entry: Entry): PageMetadataType => ({
  ...entry.fields,
  pageRobots: entry.fields?.pageRobots?.en ?? "index, follow",
  openGraphImage: entry.fields?.openGraphImage?.en
    ? normalizedMedia(entry.fields?.openGraphImage?.en)
    : "",
});
