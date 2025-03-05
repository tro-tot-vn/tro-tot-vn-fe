import { useRoutes } from 'react-router';
import { RouterProps } from './router.types.tsx';
import React from 'react';


function Router(props: RouterProps) {
  const { routes } = props;

  return useRoutes(routes);
}

export default React.memo(Router);