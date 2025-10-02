export type User = {
  uid: number;
  name: string;
  alias: string;
  bio?: string;
  avatar_url: string;
  role?: string;
  connects?: number[];
  contributions_count?: number;
  gender?: string;
  favs?: number[];
  original: boolean;
  created_at: string; // or Date if you parse it
  prefer_alias?: boolean;
  email: string;
  password: string;
};