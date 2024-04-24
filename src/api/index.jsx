import axios from 'axios';
import { BASE_URL_BE } from "../constant/url";

const Api = axios.create({
    //set default endpoint API
    baseURL: BASE_URL_BE,
    headers: {
        "ngrok-skip-browser-warning": "69420"
    }
})

export default Api