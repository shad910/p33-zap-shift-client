import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase/Firebase.init';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
} from 'firebase/auth';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleAuthProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleAuthProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (profile) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, profile)
                .then(() => {
                    // Update local state after profile update
                    setUser({ ...auth.currentUser });
                })
                .catch((error) => console.error(error));
        }
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const AuthInformation = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
        resetPassword
    };

    return (
        <AuthContext value={AuthInformation}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;