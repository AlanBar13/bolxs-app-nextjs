import { useState, useEffect } from 'react'
import { app } from './firebase-config';
import nookies from "nookies";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

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

    useEffect(() => {
        const unsubsribe = auth.onAuthStateChanged(async (user) => {
            if (!user){
                setAuthUser(null);
                setIsLoading(false);
                nookies.set(undefined, 'token', '', {path: '/'})
            }else{
                const token = await user.getIdToken();
                setAuthUser({email: user.email, token});
                setIsLoading(false);
                console.log('user', token)
                nookies.set(undefined, 'token', token, {path: '/'});
            }
        });

        return () => unsubsribe();
    }, [])

    useEffect(() => {
        const handle = setInterval(async () => {
            const user = auth.currentUser;
            if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);

        return () => clearInterval(handle)
    }, [])

    return { authUser, isLoading, auth, signInWithEmail, createUserWithEmail, signOut };
}

export default useFirebaseAuth;