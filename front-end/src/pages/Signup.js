import useSignup from "../hooks/useSignup";
import { useState } from "react";

export default function Signup () {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { signup, error, isLoading } = useSignup()

    const formHandler = async (e) => {
        e.preventDefault()
       
       await signup(email, password)
    }

    return(
        <form className="signup" onSubmit={formHandler}>
            <h3>Sign Up</h3>
            <label>
                Email
                <input 
                    type="string" 
                    value={email} 
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
            </label>
            <label>
                Password
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
            </label>
            {error && <p className="error">{error}</p>}

            <button 
                type="submit"
                disabled={isLoading} 
                >signup</button>
        </form>
    )
}