import { howl } from "../utils"

export const getProfileApi = async ({id}:{id:string|number}) => {
  return howl(`/user?from=${id}`, { method: "GET" })
}
export const getUsersApi = async () => {
  return howl(`/users`, { method: "GET" });
}
export const followSpiritApi = async (id:number|string,token:string) => {
  return howl(`/follows/${id}`, { method: "POST",token });
}