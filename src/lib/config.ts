// ONERIDE PROJECT CONFIGURATION
// ?? DO NOT CHANGE THIS CONFIGURE FILE UNLESS YOU ARE AWARE OF WHAT IT DOES
// ! THINK BEFORE YOU CHANGE THIS FILE

export const base_api = process.env.NEXT_PUBLIC_URL?`${process.env.NEXT_PUBLIC_URL}/api`:"/api";

const onDev = process.env.NODE_ENV === "development";

// Example usage
export const apiConfig = {
  baseUrl: base_api,
  isDevelopment: onDev,
}; 

export const dbConfig = {
  anon_key : process.env.NEXT_PUBLIC_ANON_KEY!,
  url:process.env.NEXT_PUBLIC_DB_URL!
}

export const extraConfig = {
  token_secret: process.env.NEXT_PUBLIC_JWTSECRET!
}

export const  blankImg = "https://placehold.co/500x500/png"