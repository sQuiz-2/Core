import MaterialAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MeetingRoom from '@material-ui/icons/MeetingRoom';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import LocationState from '../global/LocationState';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function AppBar({ open, setOpen }: Props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useRecoilValue(LocationState);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDisconnect() {
    localStorage.removeItem('credentials');
    history.push('/login');
  }

  function handleProfile() {
    history.push('/profile');
  }

  return (
    <MaterialAppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="ouvrir le menu"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
          {location}
        </Typography>
        <IconButton
          aria-label="mon compte"
          aria-controls="primary-search-account-menu"
          color="inherit"
          onClick={handleProfile}>
          <AccountCircle />
        </IconButton>
        <IconButton
          aria-label="deconnexion"
          aria-controls="primary-search-account-menu"
          color="inherit"
          onClick={handleDisconnect}>
          <MeetingRoom />
        </IconButton>
      </Toolbar>
    </MaterialAppBar>
  );
}
