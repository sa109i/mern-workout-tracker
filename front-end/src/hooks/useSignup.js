import { useAuthContext } from "./useAuthContext"
import { useState, useContext } from "react";

export default function useSignup() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers:  {'Content-Type': 'application/json'}
        })

        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false);
            setError(json.error);
        } else {
            localStorage.setItem('user', JSON.stringify(json));

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false);
        }
    }

    return { signup, error, isLoading }
}