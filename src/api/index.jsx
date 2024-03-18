import axios from 'axios';

const Api = axios.create({
    //set default endpoint API
    baseURL: 'https://quick-crow-crack.ngrok-free.app'
})

export default Api