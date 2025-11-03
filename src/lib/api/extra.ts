import { howl } from "../utils";

export const postFeedbackApi = async ({
  body,
  token,
}: {
  body: {
    name: string;
    email: string;
    feedback: string;
  };
  token?: string;
}) => {
  return howl("/feedback", { method: "POST", body, token });
};

export const getFeedbacksApi = async ({
  token,
}: {
  token?: string;
}) => {
  return howl("/feedback", {token});
};
