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

export const postDevNoteApi = async ({
  body,
  token,
}: {
  body: {
    note: string;
  };
  token?: string;
}) => {
  return howl("/devnote", { method: "PUT", body, token });
};

export const getDevNoteApi = async () => {
  return howl("/devnote");
};


