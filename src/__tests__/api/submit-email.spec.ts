import { internet } from "faker";
import { NextApiRequest, NextApiResponse } from "next";
import submitEmailApi, {
  submitEmail,
  analytics,
} from "src/pages/api/submit-email";
import { mocked } from "ts-jest/utils";

jest.mock("analytics-node", () => jest.fn().mockImplementation(() => 
    // The track and identify methods take the properties as the first argument
    // and a callback as the second argument. To mock, we just need to make sure
    // the callback is invoked.
     ({
      track: jest.fn().mockImplementation((_, callback) => callback()),
      identify: jest.fn().mockImplementation((_, callback) => callback()),
    })
  ));
const mockedAnalytics = mocked(analytics, true);

describe("submitEmailApi", () => {
  const id = "12345";
  const email = internet.email();
  const event = "Marketing: Email Submitted";

  it("submits an email", async () => {
    const identify = {
      userId: email,
      anonymousId: id,
      traits: {
        email,
        marketing_email_opt_in: true,
        is_prospect: true,
      },
    };

    const track = {
      userId: email as string,
      event,
      properties: {
        email,
        is_prospect: true,
        marketing_email_opt_in: true,
      },
    };

    await submitEmail(id, email);

    expect(mockedAnalytics.track).toHaveBeenCalledWith(
      track,
      expect.any(Function),
    );
    expect(mockedAnalytics.identify).toHaveBeenCalledWith(
      identify,
      expect.any(Function),
    );
  });

  it("fails when wrong secret is provided", () => {
    const req = {
      query: {
        secret: "12345",
        id,
        email,
      },
    } as unknown as NextApiRequest;

    const res = {} as NextApiResponse;

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    submitEmailApi(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
