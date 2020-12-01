import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Games from 'src/pages/Games';

import Container from '../components/Container';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Users from '../pages/Users';

export default function MenuRouter() {
  return (
    <Container>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/games">
          <Games />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </Switch>
    </Container>
  );
}
