import { howl } from "../utils";

export const postBlogApi = async ({
  body,
  token,
}: {
  body: { title: string; body: string };
  token: string;
}) => {
  return howl("/blog", { method: "POST", body, token });
};
