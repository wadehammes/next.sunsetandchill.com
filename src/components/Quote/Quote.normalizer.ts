import {
  Alignment,
  ContentfulColors,
  Entry,
  FontStyle,
} from "src/interfaces/common.interfaces";
import { QuoteType } from "src/components/Quote/Quote.interfaces";

export const normalizedQuote = (entry: Entry): QuoteType => ({
  ...entry,
  quotee: entry?.quotee?.en ?? "",
  quoteIconColor: entry?.quoteIconColor?.en ?? ContentfulColors.Purple,
  quoteFontStyle: entry?.quoteFontStyle?.en ?? FontStyle.Normal,
  align: entry?.align?.en ?? Alignment.Center,
});
