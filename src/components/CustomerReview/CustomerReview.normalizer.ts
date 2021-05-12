import { normalizedMedia } from "src/client/common.normalizer";
import { Entry } from "src/interfaces/common.interfaces";
import { CustomerReviewType } from "src/components/CustomerReview/CustomerReview.interfaces";

export const normalizedCustomerReview = (entry: Entry): CustomerReviewType => ({
  id: entry.sys.id,
  ...entry.fields,
  customerHeadshot: entry.fields?.customerHeadshot?.en
    ? normalizedMedia(entry.fields?.customerHeadshot?.en)
    : null,
  customerName: entry.fields?.customerName?.en ?? "",
});
