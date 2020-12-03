import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Help from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import SportsEsports from '@material-ui/icons/SportsEsports';
import React, { useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import LocationState from '../global/LocationState';

type Props = {
  text: string;
  icon: React.ReactNode;
  url: string;
};

function AppBarIcon({ text, icon, url }: Props) {
  const match = useRouteMatch(url);
  const history = useHistory();
  const setLocation = useSetRecoilState(LocationState);
  let selected = false;
  if (url !== '/' && match) {
    selected = true;
  } else if (url === '/' && match?.isExact) {
    selected = true;
  }

  useEffect(() => {
    if (selected) {
      setLocation(text);
    }
  }, [setLocation, text, selected]);

  function handleClick() {
    setLocation(text);
    history.push(url);
  }

  return (
    <ListItem button key={text} selected={selected} onClick={handleClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

export default function DrawerIcons() {
  return (
    <List>
      <AppBarIcon text="Accueil" url="/" icon={<HomeIcon />} />
      <AppBarIcon text="Salons" url="/games" icon={<SportsEsports />} />
      <AppBarIcon text="Rounds" url="/rounds" icon={<Help />} />
    </List>
  );
}
