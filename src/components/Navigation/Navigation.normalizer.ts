import { normalizedMedia } from "src/client/common.normalizer";
import { Entry } from "src/interfaces/common.interfaces";
import { normalizedPage } from "src/components/Page/Page.normalizer";
import { normalizedBanner } from "src/components/Banner/Banner.normalizer";

export const normalizedNavigation = (entry: Entry): NavigationType => ({
  id: entry.sys.id,
  ...entry.fields,
  logo: entry?.fields?.logo?.en
    ? normalizedMedia(entry?.fields?.logo?.en)
    : null,
  loginButtonUrl: entry?.fields?.loginButtonUrl?.en ?? null,
  showLanguageSelectMenu: entry?.fields?.showLanguageSelectMenu?.en ?? false,
  pages: entry.fields?.pages?.en?.map(normalizedPage) ?? [],
  showSignUpButton: entry.fields?.showSignUpButton?.en ?? false,
  signUpButtonUrl: entry.fields?.signUpButtonUrl?.en ?? null,
  rhythmEmail: entry.fields?.rhythmEmail?.en ?? "",
  rhythmPhone: entry.fields?.rhythmPhone?.en ?? "",
  rhythmDigitalCampaignPhone:
    entry.fields?.rhythmDigitalCampaignPhone?.en ?? "",
  banner: entry.fields?.banner?.en
    ? normalizedBanner(entry.fields.banner.en)
    : null,
  showPhoneNumber: entry?.fields?.showPhoneNumber?.en ?? true,
});
