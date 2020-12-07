import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';

import RequestErrors from '../components/RequestErrors';
import { storeUser } from '../tools/Auth';
import { post } from '../tools/WrappedFetch';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<FormData>();
  const [mutate, { status, data, error, isLoading }] = useMutation((formData: FormData) => {
    return post<{ email: string; token: string }>('login', formData);
  });
  const history = useHistory();
  const location = useLocation();
  const { from } = (location.state as any) || { from: { pathname: '/' } };

  const onSubmit = handleSubmit((credentials) => {
    mutate(credentials);
  });

  useEffect(() => {
    if (status !== 'success') return;
    if (data) {
      storeUser(data);
      history.replace(from);
    }
  }, [data, history, status, from]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Administration
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <RequestErrors error={error} />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            defaultValue="admin@admin.fr"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            defaultValue="secret"
          />
          {isLoading ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Connexion
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
}
