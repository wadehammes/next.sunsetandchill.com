// Test: /tests/api/submit-email.spec.ts

import { NextApiRequest, NextApiResponse } from "next";
import Analytics from "analytics-node";

export const analytics = new Analytics(
  process.env.SEGMENT_ANALYTICS_KEY as string,
);

export const submitEmail = (
  id: string | string[],
  email: string | string[],
) => new Promise((resolve, reject) => {
    // Pass "traits" into the identify call and also the track,
    // this is the only way I have been able to get them to properly
    // show in Iterable user object.
    //
    // https://app.iterable.com/users/profiles/wade.hammes@gmail.com
    analytics.identify(
      {
        userId: email as string,
        anonymousId: id as string,
        traits: {
          email: email as string,
          marketing_email_opt_in: true,
          is_prospect: true,
        },
      },
      (identifyError) => {
        if (identifyError) {
          return reject();
        }

        analytics.track(
          {
            userId: email as string,
            event: "Marketing: Email Submitted",
            properties: {
              email: email as string,
              marketing_email_opt_in: true,
              is_prospect: true,
            },
          },
          (trackError) => {
            if (!trackError) {
              resolve("success");
            } else {
              reject();
            }
          },
        );
      },
    );
  });

// eslint-disable-next-line import/no-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { secret, id, email } = req.query;

  // This secret key just allows us to make sure no one externally can hit this endpoint
  if (secret !== process.env.API_SECRET || !email || !id) {
    return res
      .status(401)
      .json({ message: "Invalid token or missing id/email." });
  }

  // Submit to segment
  await submitEmail(id, email);

  // Optimistically return
  res.end();
};
