import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkAuthStatus } from "../lib/api-communicators";

type User = {
  name: string;
  email: string;
  dob: Date;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthChecked: boolean; // New state to track if auth status has been checked
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // New state

  useEffect(() => {
    async function checkStatus() {
      try {
        const data = await checkAuthStatus();

        if (data) {
          setUser({ email: data.email, name: data.name, dob: data.dob });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsAuthChecked(true); // Indicate that auth check is complete
      }
    }
    checkStatus();
  }, []);

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    isAuthChecked, // Expose the auth-checked state
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
