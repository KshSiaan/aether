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

export const getBlogApi = async () => {
  return howl("/blog");
};
export const getSpecificBlogApi = async ({id}:{id:string}) => {
  return howl(`/blog?from=${id}`);
};
