import { getCurrentUser } from "@/lib/appwrite/api";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// User type definition
interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
}

interface IContextType {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}

export const INITIAL_USER: IUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE: IContextType = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

// Add export here for AuthProvider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Add navigate

  const checkAuthUser = async () => {
    setIsLoading(true); // Set loading to true when the check starts
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
      return false;
    } finally {
      setIsLoading(false); // End loading state regardless of success or failure
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");

    // If no cookie, navigate to sign-in unless on sign-up page
    if (!cookieFallback || cookieFallback === "[]") {
      if (window.location.pathname !== "/sign-up") {
        navigate("/sign-in");
      }
    } else {
      checkAuthUser().then((isAuth) => {
        if (!isAuth && window.location.pathname !== "/sign-up") {
          navigate("/sign-in");
        }
      });
    }
  }, [navigate]);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useUserContext = () => useContext(AuthContext);
