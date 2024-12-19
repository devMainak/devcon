import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Holds the current user state
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "https://devcon-swart.vercel.app/login",
        credentials,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
