import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Environments, Languages } from "src/interfaces/common.interfaces";
import { PageMetadataType } from "src/components/Page/Page.interfaces";
import { useInterpolateCityData } from "src/hooks/useInterpolateCityData";
import { BlogPostMetadataType } from "src/components/Blog/Blog.interfaces";
import { CONSTANTS as constant } from "src/utils/constants";

interface HelmetProps {
  readonly metadata: PageMetadataType | BlogPostMetadataType;
}

export const Helmet: FC<HelmetProps> = ({ metadata, children }) => {
  const [pageUrl, setPageUrl] = useState<Location | null>(null);
  const { locale, asPath } = useRouter();

  useEffect(() => {
    // Need to capture window.location in useEffect since this is in SSR
    // Used for hreflang meta tag
    setPageUrl(window.location);
  }, [metadata]);
  const interpolate = useInterpolateCityData();

  const title = metadata?.pageDisplayTitle
    ? interpolate(metadata.pageDisplayTitle[locale as Languages])
    : [];
  const description = metadata?.pageDescription
    ? interpolate(metadata.pageDescription[locale as Languages])
    : [];
  const keywords = metadata?.pageKeyword
    ? interpolate(
        typeof metadata.pageKeyword === "string"
          ? metadata.pageKeyword
          : metadata.pageKeyword[locale as Languages],
      )
    : [];

  const getFaviconPath = () => {
    switch (process.env.ENVIRONMENT || Environments.Production) {
      case Environments.Local:
        return "/icons/favicon-red.ico";
      case Environments.Staging:
        return "/icons/favicon-yellow.ico";
      case Environments.Production:
      default:
        return "/favicon.ico";
    }
  };

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:site_name" content={constant.SITE_TITLE} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/x-icon" href={getFaviconPath()} />
      {title && <meta property="og:title" content={title.join("")} />}
      {description && (
        <>
          <meta name="description" content={description.join("")} />
          <meta property="og:description" content={description.join("")} />
        </>
      )}
      {keywords && <meta name="keywords" content={keywords.join("")} />}
      {pageUrl && (
        <>
          <meta
            property="og:url"
            content={`${pageUrl.origin}${pageUrl.pathname}`}
          />
          <link rel="canonical" href={`${pageUrl.origin}${pageUrl.pathname}`} />
          <link
            rel="alternate"
            hrefLang="es"
            href={`${pageUrl.origin}/es${asPath}`}
          />
          <link
            rel="alternate"
            hrefLang="en"
            href={`${pageUrl.origin}${asPath}`}
          />
          <link
            rel="alternate"
            hrefLang="x-default"
            href={`${pageUrl.origin}${asPath}`}
          />
        </>
      )}
      {metadata?.openGraphImage && (
        <meta
          property="og:image"
          content={`https:${
            metadata?.openGraphImage?.file?.url[locale as Languages]
          }`}
        />
      )}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@GotRhythmHQ" />
      <meta name="twitter:creator" content="@GotRhythmHQ" />
      <meta property="og:locale" content={locale} />
      <link
        rel="preload"
        href="/fonts/Averta/bold-italic.woff2"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Averta/bold.woff2"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Averta/light-italic.woff2"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Averta/light.woff2"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Averta/regular-italic.woff2"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Averta/regular.woff2"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Averta/semibold-italic.woff2"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Averta/semibold.woff2"
        as="font"
        crossOrigin="anonymous"
      />
      {children}
    </Head>
  );
};

export default Helmet;
