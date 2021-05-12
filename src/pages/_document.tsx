import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import * as SegmentSnippet from "@segment/snippet";
import { ServerStyleSheet } from "styled-components";

const { SEGMENT_ANALYTICS_KEY } = process.env;

// eslint-disable-next-line import/no-default-export
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const GA_ENVIRONMENT_PARAMS = process.env.GA_GTM_AUTH
      ? `&gtm_auth=${process.env.GA_GTM_AUTH}&gtm_preview=${process.env.GA_GTM_PREVIEW_ENV}&gtm_cookies_win=x`
      : "";

    return (
      <Html>
        <Head>
          <link href="/fonts/fontface.css" rel="stylesheet" />
          <script
            type="text/javascript"
            src="https://polyfill.io/v3/polyfill.min.js?features=Intl.RelativeTimeFormat%2CIntl%2Cfetch%2Cdefault%2CURLSearchParams%2Cwindow.scroll%2CIntersectionObserver%2CIntersectionObserverEntry%2CIntl.DateTimeFormat%2CIntl.DateTimeFormat.prototype.formatToParts%2CIntl.DisplayNames%2CIntl.ListFormat%2CIntl.Locale%2CIntl.NumberFormat%2CIntl.PluralRules%2CIntl.getCanonicalLocales%2Ces6%2Ces7"
            async
          />
          <script
            type="text/javascript"
            // This is how NextJS says to include GA tags in their official documentation:
            // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":
              new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src=
              "https://www.googletagmanager.com/gtm.js?id=${process.env.GA_TRACKING_ID}${GA_ENVIRONMENT_PARAMS}";f.parentNode.insertBefore(j,f);
              })(window,document,"script","dataLayer", "${process.env.GA_TRACKING_ID}");`,
            }}
          />
          {SEGMENT_ANALYTICS_KEY && (
            <script
              // This is how NextJS says to include Segment tags in their official documentation:
              // https://github.com/vercel/next.js/blob/9fd9d83221c064eddb14cc3d34bb3f1200ead9a6/examples/with-segment-analytics/pages/_document.js
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: SegmentSnippet.min({
                  apiKey: SEGMENT_ANALYTICS_KEY,
                  page: false,
                  // Include the segment assets, but don't load until we know this isn't a bot
                  load: false,
                }),
              }}
            />
          )}
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.GA_TRACKING_ID}${GA_ENVIRONMENT_PARAMS}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="google-analytics"
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
