import { AuthProviderContextType } from "@/components/providers/auth-provider/auth-provider.types";
import { Context, useContext } from "react";
let AuthProviderContext: Context<AuthProviderContextType | undefined>;
export const useAuth = () => {
  const context = useContext(AuthProviderContext);


  if (context === undefined) {
    throw new Error(
      "useAuth must be used within a AuthProviderContext.Provider"
    );
  }
  return context;
};
export const setAuth = (
  context: Context<AuthProviderContextType | undefined>
) => {
  AuthProviderContext = context;
};
export default useAuth;
