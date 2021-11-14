import axios from 'axios';
import { serverPath } from "./keys"


export const userInstance = () => {
    return axios.create({
        baseURL: `${serverPath}/api/user`,
        withCredentials: true,
        headers: {
            Authorization: localStorage.getItem('userwebtoken')
                ? `Bearer ${localStorage.getItem('userwebtoken')}`
                : '',
        },
    });
};

