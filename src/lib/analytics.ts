/// <reference types="@types/segment-analytics" />
import isbot from "isbot";

interface GTMPageEventProps {
  event: string;
  page: string;
}

interface SegmentEventProps {
  category: string;
  action: string;
  label: string;
  value?: string | boolean;
}

declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS;
  }
}

export const loadAnalytics = () => {
  const { SEGMENT_ANALYTICS_KEY } = process.env;

  if (
    Boolean(window.analytics?.load) &&
    !isbot(navigator.userAgent) &&
    SEGMENT_ANALYTICS_KEY
  ) {
    window.analytics?.load(SEGMENT_ANALYTICS_KEY);
    window.analytics?.page();
  }
};

export const trackEvent = (event: string, properties: SegmentEventProps) => {
  window.analytics?.track(event, properties);
};

export const trackPageView = (url: string): void => {
  const pageEvent: GTMPageEventProps = {
    event: "pageview",
    page: url,
  };

  // Since dataLayer doesn't exist on the window object by default,
  // we need to retype window for this instance.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window && (window as any)?.dataLayer.push(pageEvent);

  window.analytics?.page();
};
