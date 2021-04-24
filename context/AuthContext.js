import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  //Register USer
  const register = async (user) => {
    console.log(user);
  };

  //Login User
  const login = async ({ email: identifier, password }) => {
    console.log({ identifier, password });
  };

  //Logout USer
  const logout = async () => {
    console.log("logout");
  };

  //Check if user logged in
  const checkUserLoggedIn = async () => {
    console.log("check logged in");
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
