import { Entry } from "src/interfaces/common.interfaces";
import { CustomerReviewCarouselType } from "src/components/CustomerReviewCarousel/CustomerReviewCarousel.interfaces";
import { CONSTANTS } from "src/utils/constants";

export const normalizedCustomerReviewCarousel = (
  entry: Entry,
): CustomerReviewCarouselType => ({
  ...entry,
  feedId: entry?.feedId?.en ?? CONSTANTS.RH_CURATED_FEED_ID,
});
