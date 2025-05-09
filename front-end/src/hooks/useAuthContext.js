
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw Error("useAuthContext must be used inside the Authcontext provider!")
    }

    return context;
}