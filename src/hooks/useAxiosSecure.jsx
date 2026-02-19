import React from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const secureInstance = axios.create({
    baseURL: `${import.meta.env.VITE_URL}`,
});

const useAxiosSecure = () => {

    const { user } = useAuth();

    secureInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
    }, error => {
        return Promise.reject(error);
    });

    return secureInstance;
};

export default useAxiosSecure;