import React from "react";
import { BrowserRouter } from "react-router";
import { ErrorBoundary } from 'react-error-boundary';
import { LoaderCircle } from "lucide-react";
import ErrorFallback from "../../elements/error-fallback";
import AuthProvider from "../auth-provider/auth-provider";

function AppProvider(props: React.PropsWithChildren<object>) {
    const { children } = props;
  
    return (
      <React.Suspense
        fallback={
          <LoaderCircle className="animate-spin"/>
        }
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AuthProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </AuthProvider>
        </ErrorBoundary>
      </React.Suspense>
    );
  }
  
  export default React.memo(AppProvider);