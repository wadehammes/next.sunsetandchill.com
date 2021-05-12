import { Entry, LinkTarget } from "src/interfaces/common.interfaces";
import { CTAType } from "src/components/CTA/CTA.interfaces";
import { normalizedPage } from "src/components/Page/Page.normalizer";

export const normalizedCta = (entry: Entry): CTAType => ({
  id: entry.sys.id,
  ...entry.fields,
  ctaPageLink: entry.fields?.ctaPageLink?.en
    ? normalizedPage(entry.fields.ctaPageLink.en)
    : null,
  ctaExternalUrl: entry.fields?.ctaExternalUrl?.en ?? null,
  ctaExternalUrlTarget:
    entry.fields?.ctaExternalUrlTarget?.en ?? LinkTarget.Self,
  ctaType: entry.fields?.ctaType?.en ?? null,
  ctaStyle: entry.fields?.ctaStyle?.en ?? "Primary",
  ctaButtonId: entry.fields?.ctaButtonId?.en ?? "",
});
