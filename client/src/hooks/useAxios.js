import axios from "axios";

const SERVER_URL = "http://localhost:9000";

export const axiosClient = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true
});
export const axiosClientPrivate = axios.create({
    baseURL: SERVER_URL+"/api",
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
    },
    withCredentials: true
});