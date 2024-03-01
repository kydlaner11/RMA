const env = import.meta.env.VITE_APP_ENV;

const url = {
  development: {
    BASE_URL_BE: "https://rickandmortyapi.com",
    BASE_URL_PUSHER: "d9af-202-148-7-130.ngrok.io",
    BASE_URL_FE: "https://localhost:3010",
  },
  staging: {
    BASE_URL_BE: "https://rickandmortyapi.com",
    BASE_URL_PUSHER: "https://d9af-202-148-7-130.ngrok.io",
    BASE_URL_FE: "https://localhost:3010",
  },
  production: {
    BASE_URL_BE: "https://rickandmortyapi.com",
    BASE_URL_PUSHER: "https://d9af-202-148-7-130.ngrok.io",
    BASE_URL_FE: "https://localhost:3010",
  },
};

export const BASE_URL_PUSHER = url[env].BASE_URL_PUSHER;
export const BASE_URL_BE = url[env].BASE_URL_BE;
export const BASE_URL_BE_GRAPHQL = url[env].BASE_URL_BE + "/graphql";
export const BASE_URL_FE = url[env].BASE_URL_FE;
