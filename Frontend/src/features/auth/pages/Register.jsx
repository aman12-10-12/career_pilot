import {Link} from "react-router"

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }


    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="aman@gmail.com" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="aman@123" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="••••••••" required />
                    </div>
                    <button className="btn btn-primary" type="submit">Register</button>
                </form>

                <p className="redirect-link">
                    Already have an account ? <Link to="/login">Login</Link>
                </p>
            </div>
        </main>
    )
}

export default Register
