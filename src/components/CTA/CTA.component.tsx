import { RhythmLink } from "src/components/RhythmLink/RhythmLink.component";
import { Button } from "src/components/Button/Button.component";
import { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CONSTANTS as constant } from "src/utils/constants";
import { getPageById } from "src/client";
import { CTALinkType, CTAType } from "src/components/CTA/CTA.interfaces";
import { Languages, LinkTarget } from "src/interfaces/common.interfaces";
import { appendUrlParams } from "src/utils/helpers";
import { normalizedCta } from "src/components/CTA/CTA.normalizer";
import { ButtonSizes } from "src/components/Button/Button.interfaces";
import { trackEvent } from "src/lib/analytics";
import { useQueryParamString } from "src/hooks/useQueryParamString";

interface CTAProps {
  cta: CTAType;
  lightVariant?: boolean;
  size?: ButtonSizes;
}

export const CTA: FC<CTAProps> = ({
  cta,
  lightVariant = false,
  size = ButtonSizes.Regular,
}): ReactElement => {
  const { locale } = useRouter();
  const { queryParamString } = useQueryParamString();
  const [pageSlug, setPageSlug] = useState<{
    slug: string;
  }>({
    slug: "",
  });

  // Because PageDoubleSection sections deeply nest entries, we do not get a normalized CTA by default.
  const ctaFields = cta?.en ? normalizedCta(cta.en) : cta;

  useEffect(() => {
    const validateSlug = (slug: string) => {
      let newSlug = slug ?? "";

      if (slug === constant.RH_HOME_PAGE_SLUG) {
        newSlug = "";
      }

      if (slug.startsWith("/")) {
        newSlug = slug.substring(1);
      }

      setPageSlug({
        slug: `/${newSlug}`,
      });
    };

    // If we don't get the CTA page object back initially, we need
    // to fetch it from Contentful
    if (ctaFields?.ctaPageLink?.id && !ctaFields?.ctaPageLink?.slug) {
      (async () => {
        const page = await getPageById({ id: ctaFields.ctaPageLink.id });
        const slug = page?.previewSlug ?? "";

        validateSlug(slug);
      })();
    } else {
      const slug = ctaFields?.ctaPageLink?.previewSlug ?? "";

      validateSlug(slug);
    }
  }, [
    ctaFields.ctaPageLink?.id,
    ctaFields.ctaPageLink?.previewSlug,
    ctaFields.ctaPageLink?.slug,
  ]);

  const handleSegmentEvent = useCallback(() => {
    if (
      ctaFields?.ctaExternalUrl.startsWith(constant.RH_APP_HTTPS_URL) ||
      ctaFields?.ctaExternalUrl.startsWith(constant.RH_APP_HTTP_URL)
    ) {
      const {
        location: { pathname = "" },
      } = window;
      // Remove leading slash. If pathname is `/`, replace it with "home"
      const categoryPath = pathname.substring(1) || "home";

      trackEvent("enrollmentClick", {
        action: "ctaClicked",
        category: `marketing.${categoryPath}`,
        label: ctaFields?.ctaText[locale as Languages] || "cta",
        value: ctaFields?.ctaButtonId ?? "",
      });
    }

    return true;
  }, [
    ctaFields?.ctaExternalUrl,
    ctaFields?.ctaText,
    ctaFields?.ctaButtonId,
    locale,
  ]);

  return (
    ctaFields && (
      <>
        {ctaFields.ctaType === CTALinkType.Page && pageSlug.slug && (
          <RhythmLink href={pageSlug.slug} passHref>
            <a target={ctaFields.ctaExternalUrlTarget}>
              <Button
                buttonAs="span"
                buttonDataId={`cta-${cta?.ctaButtonId ?? ""}-${ctaFields.id}`}
                variant={ctaFields.ctaStyle}
                lightVariant={lightVariant}
                buttonLabel={ctaFields.ctaText[locale as Languages]}
                size={size}
              />
            </a>
          </RhythmLink>
        )}
        {ctaFields.ctaType === CTALinkType.External && cta?.ctaExternalUrl && (
          <Button
            buttonAs="a"
            buttonDataId={`cta-${cta?.ctaButtonId ?? ""}-${ctaFields.id}`}
            buttonLabel={ctaFields.ctaText[locale as Languages]}
            variant={ctaFields.ctaStyle}
            lightVariant={lightVariant}
            url={`${appendUrlParams(cta?.ctaExternalUrl, queryParamString)}`}
            target={ctaFields.ctaExternalUrlTarget}
            rel={
              ctaFields.ctaExternalUrlTarget === LinkTarget.Blank
                ? "noopener noreferrer"
                : ""
            }
            size={size}
            handleClick={handleSegmentEvent}
          />
        )}
      </>
    )
  );
};

export default CTA;
