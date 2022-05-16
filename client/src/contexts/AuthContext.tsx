import { createContext, useContext, useState } from "react";
import { User } from "../utils/types";

interface AuthContextType {
  currentUser: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signIn: (user: User) => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const value: AuthContextType = {
    currentUser,
    signIn: (user: User) => setCurrentUser(user),
    signOut: () => setCurrentUser(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
