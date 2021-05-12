import { useEffect, useState } from "react";
import {
  EmbedSocialReviewType,
  ReviewsMetaType,
} from "src/components/CustomerReviewCarousel/CustomerReviewCarousel.interfaces";
import { CONSTANTS } from "src/utils/constants";

export const useReviews = (feedId = CONSTANTS.RH_CURATED_FEED_ID) => {
  const [reviews, setReviews] = useState<EmbedSocialReviewType[]>([]);
  const [allReviews, setAllReviews] = useState<EmbedSocialReviewType[]>([]);
  const [fetchingReviews, setFetchingReviews] = useState<boolean>(true);
  const [reviewsMeta, setReviewsMeta] = useState<ReviewsMetaType>({
    total: undefined,
    averageRating: undefined,
    sources: undefined,
    userHeadshots: undefined,
  });

  // Fetch the reviews from our curated reviews feed
  useEffect(() => {
    const apiUrl = `/api/embed-social?secret=${process.env.API_SECRET}&feedId=${feedId}`;

    (async () => {
      const fetchReviews = await fetch(apiUrl);

      if (fetchReviews.ok) {
        const reviewsJson = await fetchReviews.json();

        if (reviewsJson) {
          setFetchingReviews(false);
          setReviews(reviewsJson?.data ?? []);
        }
      }
    })();
  }, [feedId]);

  // Fetch all reviews to build out review metadata
  useEffect(() => {
    const apiUrl = `/api/embed-social?secret=${process.env.API_SECRET}`;

    (async () => {
      const fetchReviews = await fetch(apiUrl);

      if (fetchReviews.ok) {
        const reviewsJson = await fetchReviews.json();

        if (reviewsJson) {
          setAllReviews(reviewsJson?.data ?? []);
        }
      }
    })();
  }, []);

  // Set up reviews meta data based off all reviews
  useEffect(() => {
    if (allReviews) {
      const ratingsTotal = allReviews
        .map((review) => review.review_rating)
        .reduce((a, b) => a + b, 0);

      const sources = allReviews.map((review) => review.source_type);

      const userHeadshots = allReviews
        .slice(0, 3)
        .map((review) => review.reviewer_photo);

      setReviewsMeta({
        total: allReviews.length,
        averageRating: ratingsTotal / allReviews.length,
        sources: Array.from(new Set(sources)),
        userHeadshots,
      });
    }
  }, [allReviews]);

  return {
    reviews,
    fetchingReviews,
    reviewsMeta,
  };
};
