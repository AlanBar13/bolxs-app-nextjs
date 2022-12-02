import { useState, useEffect } from 'react'
import { app } from './firebase-config';
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { api } from './api';

const formatAuthUser = (user, dbData, token) => {
    if (dbData){
        return {
            email: user.email,
            uid: user.uid,
            token: token,
            name: dbData.name,
            lastname: dbData.lastname,
            organizer: dbData.organizer,
            id: dbData.ID
        }
    }else {
        return {
            email: user.email,
            uid: user.uid,
            token: token,
        }
    }
}

const useFirebaseAuth = () => {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth();

    const clear = () => {
        setIsLoading(true);
        setAuthUser(null);
        setIsLoading(false);
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
        const token = await authState.getIdToken(true)
        const formattedUser = formatAuthUser(authState, data, token);
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