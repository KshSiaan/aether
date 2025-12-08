import { User } from "../types/user";
import { howl } from "../utils";

export const getNodesApi = async () => {
  return howl("/node");
};
export const deleteNodeApi = async ({id,token}:{id:string|number,token:string}) => {
  return howl(`/node?id=${id}`,{method:"DELETE",token});
};

export const createNodesApi = async ({name,description,token}:{name:string,description:string,token:string}) => {
  return howl("/node",{method:"POST",body:{name,description},token});
};

export const getCategoriesApi = async ({node}:{node?:number}):Promise<
{data:{id:number,name:string,node_id:number,created_at:string,node:{name:string,childs:number[]}}[],}> => {
  if (node) {
    return howl(`/node/category?node=${node}`)
  }
  return howl("/node/category");
};

export const createCategoryApi = async ({name,node,token}:{name:string,node:string,token:string}) => {
  return howl("/node/category",{method:"POST",body:{name,node},token});
};

export const deleteCategoryApi = async ({id,token}:{id:string|number,token:string}) => {
  return howl(`/node/category?id=${id}`,{method:"DELETE",token});
};

export const createBlockApi = async ({data,token}:{
  data:{
    title: string
    language: string
    code: string
    node: number
    categories: Array<number>
    description:string
  },
  token:string
}) => {
  return howl("/node/block",{method:"POST",body:data,token});
};


export const getBlocksByNodeIdApi = async ({node,cat}:{node:string,cat:string}) => {
  return howl(`/node/block/node?node=${node}&cat=${cat}`);
};

export const getBlockByIdApi = async ({id}:{id:string}):Promise<{
  ok:boolean,
  data:{
  id: number
  title: string
  language: string
  code: string
  node_id: number
  categories: Array<number>
  created_at: string
  author: User
  private: boolean
  description: string
  node: {
    name: string
    childs: Array<number>
  }
}
}
> => {
  return howl(`/node/block/${id}`);
};