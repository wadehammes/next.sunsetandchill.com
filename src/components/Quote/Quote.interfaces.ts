import {
  Alignment,
  ContentfulColors,
  FontStyle,
  LanguageString,
} from "src/interfaces/common.interfaces";

export interface QuoteType {
  quote: LanguageString;
  quoteIconColor: ContentfulColors;
  quoteFontStyle: FontStyle;
  quotee: string;
  align: Alignment;
}
