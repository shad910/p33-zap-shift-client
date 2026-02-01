import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const useAuth = () => {
    const AuthInformation = use(AuthContext);
    return AuthInformation;
};

export default useAuth;