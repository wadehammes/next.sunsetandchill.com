import {
  EntryId,
  LanguageString,
  MediaType,
} from "src/interfaces/common.interfaces";

export interface CustomerReviewType {
  id: EntryId;
  customerHeadshot: MediaType;
  customerName: string;
  customerTitle: LanguageString;
  customerReviewCopy: LanguageString;
}
