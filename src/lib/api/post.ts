import { howl } from "../utils";

export const createPostApi = async ({
  body,
  token,
}: {
  body: string;
  token: string;
}) => {
  return howl("/post", { method: "POST", body, token });
};

export const getPostsApi = async () => {
  return howl("/post");
};
export const getSpecificPostApi = async ({ id }: { id: string }) => {
  return howl(`/post?from=${id}`);
};
