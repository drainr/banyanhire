import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const saveAuth = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  const login = async (credentials) => {
    const result = await loginUser(credentials);
    if (result.token) {
      saveAuth(result.user, result.token);
    }
    return result;
  };

  const register = async (credentials) => {
    const result = await registerUser(credentials);
    if (result.token) {
      saveAuth(result.user, result.token);
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};