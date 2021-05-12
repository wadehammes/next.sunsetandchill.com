import { useEffect } from "react";

import * as FullStorySdk from "@fullstory/browser";

export const FullStory = () => {
  useEffect(() => {
    if (process.env.FULLSTORY_ORG_ID) {
      FullStorySdk.init({
        orgId: process.env.FULLSTORY_ORG_ID as string,
        devMode: process.env.ENVIRONMENT === "local",
        namespace: "FullStory", // fixes namespace conflict in console
      });
    }
  }, []);

  return null;
};
