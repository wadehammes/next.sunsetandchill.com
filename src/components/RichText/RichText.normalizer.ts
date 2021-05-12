import {
  Alignment,
  Entry,
  OrderedListTypes,
} from "src/interfaces/common.interfaces";
import { RichTextType } from "./RichText.interfaces";

export const normalizedRichText = (entry: Entry): RichTextType => ({
  ...entry,
  copyAlignment: entry?.copyAlignment?.en ?? Alignment.Center,
  orderedListStyle: entry?.orderedListStyle?.en ?? OrderedListTypes.Regular,
});
