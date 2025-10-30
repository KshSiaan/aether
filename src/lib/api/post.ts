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

export const getPostsApi = async ({token}:{token?:string}) => {
  return howl("/post",{token});
};

export const getPostsLimitedApi = async ({token}:{token?:string}) => {
  return howl("/post?limit=6",{token});
};
export const getSpecificPostApi = async ({ id }: { id: string }) => {
  return howl(`/post?from=${id}`);
};
export const togglePostHeart = async ({ id,token }: { id: string|number,token:string }) => {
  return howl(`/post?id=${id}`,{method:"PATCH",token});
};

