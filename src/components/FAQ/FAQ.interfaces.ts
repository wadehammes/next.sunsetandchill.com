import { Document } from "@contentful/rich-text-types";
import {
  AllLanguageObject,
  LanguageString,
} from "src/interfaces/common.interfaces";

export interface FAQItem {
  faqTitle: LanguageString;
  faqBody: AllLanguageObject<Document>;
}

export interface FAQType {
  faqItems: FAQItem[];
}
