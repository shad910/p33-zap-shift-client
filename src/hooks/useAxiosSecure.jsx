import React from 'react';
import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';


const secureInstance = axios.create({
    baseURL: `${import.meta.env.VITE_URL}`,
});

const useAxiosSecure = () => {

    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    secureInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
    }, error => {
        return Promise.reject(error);
    });

    secureInstance.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;

        if (status === 403) {
            return navigate('/forbidden')
        } else if (status === 401) {
            logOut()
                .then(() => { navigate('/login') })
                .catch(() => { });

        }

        return Promise.reject(error);
    })

    return secureInstance;
};

export default useAxiosSecure;