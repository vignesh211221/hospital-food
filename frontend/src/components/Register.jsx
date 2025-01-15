import React, { useState } from "react";
import axios from "axios";
import "../styles/register.css"; // Import custom CSS file

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "manager", // Default role
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
                formData
            );
            if (response.data.success) {
                setSuccess("Registration successful!");
                setError("");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
            setSuccess("");
        }
    };

    return (
        <div className="register-container">
            <div className="form-container">
                <h1 className="form-title">Register</h1>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className="label">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="input"
                        required
                    />

                    <label htmlFor="email" className="label">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="input"
                        required
                    />

                    <label htmlFor="password" className="label">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="input"
                        required
                    />
                    <button type="submit" className="submit-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
