import { Link } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

export default function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    console.log(user);
    
    
    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h2>workout buddy</h2>
                </Link>
                <nav>
                    {
                        user ? 
                            <div>
                                <span>{user.email}</span>
                                <button 
                                    onClick={() => logout()}
                                    className="button"
                                    >
                                        logout
                                </button>

                            </div>
                             : 
                            <div>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Signup</Link>
                            </div>
                    }
                   

                    
                    
                    
                </nav>
            </div>
        </header>
    )
}