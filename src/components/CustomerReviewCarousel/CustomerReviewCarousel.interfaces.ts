// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
import { EntryId } from "src/interfaces/common.interfaces";

export interface ReviewsMetaType {
  total: number | undefined;
  averageRating: number | undefined;
  sources: ReviewSourceType[] | undefined;
  userHeadshots: string[] | undefined;
}
export interface CustomerReviewCarouselType {
  id: EntryId;
  feedId: string | undefined;
}

export enum ReviewSourceType {
  Google = "google_place",
  Facebook = "facebook_page",
}

export interface EmbedSocialReviewType {
  id: number | string;
  review_text: string;
  review_rating: number;
  source_type: ReviewSourceType;
  source_name: string;
  source_id: string;
  reviewer_name: string;
  reviewer_email: string;
  reviewer_photo: string;
  created_on: string;
  tags: string[] | null;
}
