import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { getUser } from '../../tools/Auth';

type Props = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children, ...rest }: Props & RouteProps) {
  const token = getUser();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
