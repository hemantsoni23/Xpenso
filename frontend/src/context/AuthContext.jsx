import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('xpenso-accessToken');
    if (token) {
      setUser(true);
    }
  }, []);

  const login = (token) => {
    Cookies.set("xpenso-accessToken", token);
    setUser(true);
  };

  const logout = () => {
    Cookies.remove("xpenso-accessToken");
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
