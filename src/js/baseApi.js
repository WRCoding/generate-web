import axios from "axios";

const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

export const getRequest =  (url, config) => {
    return instance.get(url, config)
}

export const postRequest = (url, data) => {
    return instance.post(url, data)
}