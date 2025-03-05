import User from "@/types/user";
import { AuthProviderProps, AuthProviderStore } from "./auth-provider.types";
import { useCallback, useEffect, useRef, useState } from "react";

function getSaveAuthData(): AuthProviderStore {
  const userJson = localStorage.getItem("user");
  const accessToken = localStorage.getItem("accessToken");

  if (!userJson || !accessToken)
    return {
      isAuthenticated: false,
    };

  try {
    const usr = JSON.parse(userJson) as User;

    if (usr.userId) {
      return {
        isAuthenticated: true,
        accessToken: accessToken,
        user: usr,
      };
    }

    return {
      isAuthenticated: false,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  }

  return {
    isAuthenticated: false,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useAuthProviderModel(_props: AuthProviderProps) {
  const initalizedState = useRef<boolean>(false);
  const [store, setStore] = useState<AuthProviderStore>(getSaveAuthData());

  const authenticate = useCallback((accessToken: string, user: User, refreshToken : string) => {
    setStore({
      isAuthenticated: true,
      user,
      accessToken: accessToken,
    });

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }, []);

  const signout = useCallback(() => {
    setStore({
      isAuthenticated: false,
      user: undefined,
      accessToken: undefined,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);

  useEffect(() => {
    if (!initalizedState.current) {
      initalizedState.current = true;

      const userJson = localStorage.getItem("user");
      const accessToken = localStorage.getItem("accessToken");

      if (!userJson || !accessToken) return;

      try {
        const usr = JSON.parse(userJson) as User;

        if (usr.userId) {
          setStore({
            isAuthenticated: true,
            accessToken: accessToken,
            user: usr,
          });
        }
      } catch (e) {
        console.error(e);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
  }, [authenticate]);

  return {
    store,
    authenticate,
    signout,
  };
}

export default useAuthProviderModel;
