import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { BASE_URL_PUSHER } from "../constant/url";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: `${import.meta.env.VITE_APP_PUSHER_KEY}`,
  cluster: `${import.meta.env.VITE_APP_PUSHER_CLUSTER}`,
  authEndpoint: "/broadcasting/auth",
  wsHost: BASE_URL_PUSHER,
});
