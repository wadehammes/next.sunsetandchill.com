import { Entry } from "src/interfaces/common.interfaces";
import { FAQItem, FAQType } from "./FAQ.interfaces";

const normalizedFaqItem = (entry: Entry): FAQItem => ({
  ...entry.fields,
});

export const normalizedFaq = (entry: Entry): FAQType => ({
  ...entry,
  faqItems: entry?.faqItems?.en.map((item: FAQItem) => normalizedFaqItem(item)),
});
