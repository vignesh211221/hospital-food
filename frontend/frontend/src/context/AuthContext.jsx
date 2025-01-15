import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = (userData) => {
        setUser(userData); // Example: { name: 'John', role: 'manager', token: '...' }
        localStorage.setItem("token", userData.token);

        // Redirect based on role
        switch (userData.role) {
            case "manager":
                navigate("/manager");
                break;
            case "pantry":
                navigate("/pantry");
                break;
            case "delivery":
                navigate("/delivery");
                break;
            default:
                navigate("/login");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
