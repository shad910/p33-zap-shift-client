import React from 'react';
import axios from 'axios';

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_URL}`,
});

const useAxios = () => {
    return instance;
};

export default useAxios;