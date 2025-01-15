import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { email, password });
            login(data);
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
        }
    };

    return (
         <div className="login-container">   
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Login</h2>
                <label className="login-label" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                <label className="login-label" htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
               
                <button type="submit" className="login-button">Login</button>
                {/* <Link to="/register">Register here</Link> */}
            </form>
            </div>
    );
};

export default Login;
