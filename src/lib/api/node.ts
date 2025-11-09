import { howl } from "../utils";

export const getNodesApi = async () => {
  return howl("/node");
};

export const createNodesApi = async ({name,description,token}:{name:string,description:string,token:string}) => {
  return howl("/node",{method:"POST",body:{name,description},token});
};