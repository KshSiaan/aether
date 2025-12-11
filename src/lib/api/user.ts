import { howl } from "../utils"

export const getProfileApi = async ({id,token}:{id:string|number,token?:string}) => {
  return howl(`/user?from=${id}`, { method: "GET" ,token})
}
export const getUsersApi = async () => {
  return howl(`/users`, { method: "GET" });
}
export const followSpiritApi = async (id:number|string,token?:string) => {
  return howl(`/follows/${id}`, { method: "POST",token });
}
export const myFollowsApi = async (token:string) => {
  return howl(`/follows`, { method: "GET",token });
}