// https://nextjs.org/docs/advanced-features/preview-mode
import { NextApiRequest, NextApiResponse } from "next";

import { getPageById } from "src/client";

// eslint-disable-next-line import/no-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { secret, id } = req.query;

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !id) {
    return res
      .status(401)
      .json({ message: "Invalid token or missing page id." });
  }

  const page = await getPageById({ id, preview: true });

  if (!page) {
    return res
      .status(401)
      .json({ message: "Invalid id or page doesn't exist" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({ id: page.id });

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  // res.writeHead(307, { Location: `/posts/${post.slug}` })
  //
  // https://github.com/vercel/next.js/blob/canary/examples/cms-contentful/pages/api/preview.js
  const url = `/page-preview?slug=${page.previewSlug}&id=${page.id}`;

  res.redirect(url);
  res.end();
};
