import { useState, useEffect } from 'react'
import { app } from './firebase-config';
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { api } from './api';

const formatAuthUser = (user, dbData) => {
    if (dbData){
        return {
            email: user.email,
            uid: user.uid,
            token: user.refreshToken,
            name: dbData.name,
            lastname: dbData.lastname,
            organizer: dbData.organizer,
            id: dbData.ID
        }
    }else {
        return {
            email: user.email,
            uid: user.uid,
            token: user.refreshToken,
        }
    }
}

const useFirebaseAuth = () => {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth();

    const clear = () => {
        setAuthUser(null);
        setIsLoading(true);
    }

    const signInWithEmail = async (email, password) => await signInWithEmailAndPassword(auth, email, password);

    const createUserWithEmail = async (email, password) => await createUserWithEmailAndPassword(auth, email, password);

    const signOut = () => auth.signOut().then(clear);

    const authStateChanged = async (authState) => {
        if(!authState) {
            setAuthUser(null);
            setIsLoading(false);
            return;
        }
        setIsLoading(true); 
        const res = await fetch(`${api}/user/${authState.uid}`);
        const { data } = await res.json();
        const formattedUser = formatAuthUser(authState, data);
        setAuthUser(formattedUser);
        setIsLoading(false);
    }

    useEffect(() => {
        const unsubsribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubsribe();
    }, [])

    return { authUser, isLoading, signInWithEmail, createUserWithEmail, signOut };
}

export default useFirebaseAuth;