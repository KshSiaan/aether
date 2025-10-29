import { howl } from "../utils"

export const loginApi = async (body: { email: string, password: string }) => {
  return howl("/login", { method: "POST", body })
}

export const registerApi = async (body: {
  name: string;
  tag: string;
  email: string;
  password: string;
  confirm: string;
}) => {
  return howl("/register", { method: "POST", body })
}

export const meApi = async (token: string) => {
  return howl("/me", { method: "GET", token })
}

export const updateProfilePicApi = async ({token,img }: { token: string, img:string}) => {
  return howl("/updateAvatar", { method: "PATCH", token , body:{img}})
}