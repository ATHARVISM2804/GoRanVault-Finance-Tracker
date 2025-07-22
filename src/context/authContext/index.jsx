import { useContext, useEffect } from "react";
import {auth } from "../auth/firebase";
import { onAuthStateChanged } from "firebase/auth";

const authContext = React.createContext();

export function useAuth() {
    return useContext(authContext)
}

export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState(null);
    const [userLogged, setUserLogged] = useState(false);
    const [loading, setLoading] = useState(true);  
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,initializeuser);
        return () => unsubscribe();
    }, []);

    async function initializeuser(user){
        if (user){
            setCurrentUser({...user});
            setUserLogged(true);
        }else{
            setCurrentUser(null);
            setUserLogged(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLogged,
        loading
    }

    
    return (
        <authContext.Provider value={{value}}>
            {!loading &&children}
        </authContext.Provider>
    );  
}