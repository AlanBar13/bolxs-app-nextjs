import { createContext, useContext, Context } from 'react'
import useFirebaseAuth from '../lib/useFirebaseAuth'

const authContext = createContext({
    authUser: null,
    isLoading: true,
    signInWithEmail: () => {},
    createUserWithEmail: () => {},
    signOut: () => {},
})

export function AuthUserProvider({ children }) {
    const auth = useFirebaseAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)