import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import MenuRouter from './Menu';
import PrivateRoute from './helper/PrivateRoute';

export default function MainRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/">
          <MenuRouter />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
