import { setAuth } from '@/hooks/use-auth';
import { AuthProviderContextType } from './auth-provider.types';
import { createContext, PropsWithChildren } from 'react';

const AuthProviderContext = createContext<AuthProviderContextType | undefined>(undefined);

setAuth(AuthProviderContext);

export default function AuthProviderContextProvider({ value, children }: PropsWithChildren<{ value: AuthProviderContextType }>) {
  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}