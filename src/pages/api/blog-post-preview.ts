import { NextApiRequest, NextApiResponse } from "next";
import { getPostById } from "src/client";

// eslint-disable-next-line import/no-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { secret, id } = req.query;

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !id) {
    return res.status(401).json({ message: "Invalid token or missing id." });
  }

  const post = await getPostById({ id, preview: true });

  if (!post) {
    return res
      .status(401)
      .json({ message: "Invalid id or post doesn't exist." });
  }

  if (post && post.id) {
    // Enable Preview Mode by setting the cookies
    res.setPreviewData({ id: post.id });

    // Redirect to the path from the fetched page
    const url = `/blog/post-preview?slug=${post.slug}&id=${post.id}`;

    res.redirect(url);
  }

  res.end();
};
