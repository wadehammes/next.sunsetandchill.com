import { Document } from "@contentful/rich-text-types";
import {
  Alignment,
  AllLanguageObject,
  OrderedListTypes,
} from "src/interfaces/common.interfaces";

export interface RichTextType {
  copy: AllLanguageObject<Document>;
  copyAlignment: Alignment;
  orderedListStyle: OrderedListTypes;
}
