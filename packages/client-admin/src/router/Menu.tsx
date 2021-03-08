import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Ban from 'src/pages/Ban';
import Games from 'src/pages/Games';
import Reported from 'src/pages/Reported';

import Container from '../components/Container';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Rounds from '../pages/Rounds';

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
        <Route path="/reported">
          <Reported />
        </Route>
        <Route path="/rounds">
          <Rounds />
        </Route>
        <Route path="/ban">
          <Ban />
        </Route>
      </Switch>
    </Container>
  );
}
