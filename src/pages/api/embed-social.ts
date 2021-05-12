// Test: /tests/api/submit-email.spec.ts

import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { secret, feedId } = req.query;
  const apiUrl = `https://embedsocial.com/admin/v2/api/reviews/reviews-filtered?feed_id=${
    feedId ?? ""
  }&sort=created_on&per_page=200`;

  // This secret key just allows us to make sure no one externally can hit this endpoint
  if (secret !== process.env.API_SECRET) {
    return res.status(401).json({ message: "Invalid token." });
  }

  const fetchReviews = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.EMBED_SOCIAL_API_KEY}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  if (fetchReviews.ok) {
    const reviewsJson = await fetchReviews.json();

    if (reviewsJson) {
      res.status(200).json(reviewsJson);
    } else {
      res.status(404).json({ message: "Not able to fetch reviews." });
    }
  } else {
    res.status(400).json({ message: "Failed to fetch reviews." });
  }

  // Optimistically return
  res.end();
};
