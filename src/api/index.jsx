import axios from 'axios';

const Api = axios.create({
    //set default endpoint API
    baseURL: 'https://quick-crow-crack.ngrok-free.app',
    headers: {
        "ngrok-skip-browser-warning": "69420"
    }
})

export default Api