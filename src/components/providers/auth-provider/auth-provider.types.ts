import User from '@/types/user';
import React from 'react';

/**
 * Props for the AuthProvider component.
 */
export interface AuthProviderProps extends React.PropsWithChildren<object> {
  className?: string;
}

/**
 * Represents the store for the authentication provider.
 */
export interface AuthProviderStore {
  isAuthenticated: boolean;
  user?: User;
  accessToken?: string;
}

/**
 * Represents the context type for the authentication provider.
 */
export interface AuthProviderContextType {
  isAuthenticated: boolean;
  user?: User;
  accessToken?: string;
  /**
   * Authenticates the user.
   * @param user The user to authenticate.
   */
  authenticate: (accessToken: string, user: User, refreshToken : string) => void;

  /**
   * Signs out the user.
   */ 
  signout: () => void;
}
