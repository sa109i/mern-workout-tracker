import { useState } from "react";
import useLogin from "../hooks/useLogin";

export default function Login () {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { login, error, isLoading } = useLogin();

    const formHandler = async (e) => {
        e.preventDefault()

        await login(email, password);
    }

    return(
        <form className="login" onSubmit={formHandler}>
            <h3>Log in</h3>
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
            <button type="submit" disabled={isLoading}>Login</button>
            {error && <p className="error">{error}</p>}
        </form>
    )
}