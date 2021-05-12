import {
  Entry,
  EntryId,
  LanguageString,
  LinkTarget,
} from "src/interfaces/common.interfaces";
import { PageType } from "src/components/Page/Page.interfaces";
import { ButtonStyleTypes } from "src/components/Button/Button.interfaces";

export enum CTALinkType {
  External = "External",
  Page = "Page",
}

export interface CTAType {
  en: {
    sys: {
      id: EntryId;
    };
    fields: Entry;
  };
  id: EntryId;
  ctaText: LanguageString;
  ctaPageLink: PageType;
  ctaExternalUrl: string;
  ctaExternalUrlTarget: LinkTarget;
  ctaStyle: ButtonStyleTypes;
  ctaType: CTALinkType;
  ctaButtonId: string;
}
