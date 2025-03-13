import { Account } from "@/types/user.type";
import { AuthProviderProps, AuthProviderStore } from "./auth-provider.types";
import { useCallback, useEffect, useRef, useState } from "react";

function getSaveAuthData(): AuthProviderStore {
  const userJson = localStorage.getItem("account");
  const accessToken = localStorage.getItem("accessToken");

  if (!userJson || !accessToken)
    return {
      isAuthenticated: false,
    };

  try {
    const usr = JSON.parse(userJson) as Account;

    if (usr.accountId) {
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
    localStorage.removeItem("account");
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

  const authenticate = useCallback(
    (user: Account, accessToken: string,  refreshToken: string) => {
      setStore({
        isAuthenticated: true,
        user,
        accessToken: accessToken,
      });

      localStorage.setItem("account", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
    []
  );

  const signout = useCallback(() => {
    setStore({
      isAuthenticated: false,
      user: undefined,
      accessToken: undefined,
    });
    localStorage.removeItem("account");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);

  useEffect(() => {
    if (!initalizedState.current) {
      initalizedState.current = true;

      const userJson = localStorage.getItem("account");
      const accessToken = localStorage.getItem("accessToken");

      if (!userJson || !accessToken) return;

      try {
        const usr = JSON.parse(userJson) as Account;

        if (usr.accountId) {
          setStore({
            isAuthenticated: true,
            accessToken: accessToken,
            user: usr,
          });
        }
      } catch (e) {
        console.error(e);
        localStorage.removeItem("account");
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
