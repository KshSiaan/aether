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

export const getBlogApi = async () => {
  return howl("/post");
};
export const getSpecificBlogApi = async ({id}:{id:string}) => {
  return howl(`/post?from=${id}`);
};
