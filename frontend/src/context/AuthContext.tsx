import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkAuthStatus } from "../utils/api-communicators";

type User = {
  name: string;
  email: string;
  dob: Date;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(isLoggedIn);

  useEffect(() => {
    // fetch if the user's cookies are valid then skip login
    async function checkStatus() {
      const data = await checkAuthStatus();

      if (data) {
        setUser({ email: data.email, name: data.name, dob: data.dob });
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, []);

  // if (isLoggedIn) window.location.href = "/"; // Redirect to the home page

  const value = {
    user,
    setUser,
    isLoggedIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
