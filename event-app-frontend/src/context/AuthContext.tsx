import { createContext, useState, ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  userId: number | null;
  role: string | null;
  login: (token: string, userId: number, role: string) => void;
  logout: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [userId, setUserId] = useState<number | null>(
    localStorage.getItem("userId")
      ? Number(localStorage.getItem("userId"))
      : null
  );
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  const login = (newToken: string, newUserId: number, newRole: string) => {
    setToken(newToken);
    setUserId(newUserId);
    setRole(newRole);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", newUserId.toString());
    localStorage.setItem("role", newRole);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ token, userId, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
