import "../auth.form.scss"
import { Link } from "react-router"
import { useAuth } from "../hooks/useAuth.js"
import { useState } from "react"
import { useNavigate } from "react-router"

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({email, password})
        navigate("/upload")
    }

    if (loading) {
        return (
            <main>
                <div className="form-container">
                    <h1>Login</h1>
                    <p>Loading...</p>
                </div>
            </main>
        )
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" id="email" name="email" placeholder="aman@gmail.com" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" id="password" name="password" placeholder="••••••••" required />
                    </div>
                    <button className="btn btn-primary" type="submit" >
                        Login
                    </button>
                </form>
                
                <p className="redirect-link">
                    Don't have an account ? <Link to="/register">Register</Link>
                </p>
            </div>
        </main>
    )
}

export default Login
