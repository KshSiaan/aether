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
export const getSavedBlogApi = async ({token}:{token:string}) => {
  return howl("/blog/saved",{token});
};
export const getSpecificBlogApi = async ({id}:{id:string}) => {
  return howl(`/blog?from=${id}`);
};
export const toggleBookmarkApi = async ({id,token}:{id:number,token:string}) => {
  console.log(token);
  return howl(`/bookmark?id=${id}`,{token,method:"PATCH"});
};
