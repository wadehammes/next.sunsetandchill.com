import React, { useEffect } from "react";
import * as Sentry from "@sentry/node";
import { Integrations } from "@sentry/tracing";
import { ThemeProvider } from "styled-components";
import { Reset } from "src/styles/reset";
import { theme } from "src/styles/theme";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next.config";
import { AppProps } from "next/app";
import { UIProvider } from "src/context/ui.context";
import { useRouter } from "next/router";
import { loadAnalytics, trackPageView } from "src/lib/analytics";
import { FullStory } from "src/components/FullStory/FullStory.component";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],
    environment: process.env.ENVIRONMENT,
    tracesSampleRate: parseFloat(
      process.env.SENTRY_TRACES_SAMPLE_RATE || "1.0",
    ),
  } as Sentry.NodeOptions);
}

const Rhythm = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <>
      <FullStory />
      <UIProvider>
        <Reset />
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </I18nextProvider>
      </UIProvider>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Rhythm;
