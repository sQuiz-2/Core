import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import AppBar from './AppBar';
import Drawer from './Drawer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <AppBar open={open} setOpen={setOpen} />
      <Drawer open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
