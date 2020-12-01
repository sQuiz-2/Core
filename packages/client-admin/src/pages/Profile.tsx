import { Container, TextField, CircularProgress, Button, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';

import RequestErrors from '../components/RequestErrors';
import RequestSuccess from '../components/RequestSuccess';
import LocationState from '../global/LocationState';
import { getUser } from '../tools/Auth';
import { post } from '../tools/WrappedFetch';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type FormData = {
  password: string;
};

export default function Profile() {
  const classes = useStyles();
  const user = getUser();
  const setLocation = useSetRecoilState(LocationState);
  const { register, handleSubmit } = useForm<FormData>();
  const [mutate, { status, error, isLoading }] = useMutation((formData: FormData) => {
    return post('password', formData);
  });

  const onSubmit = handleSubmit((credentials) => {
    mutate(credentials);
  });

  useEffect(() => {
    setLocation('Profile');
  }, [setLocation]);

  return (
    <Container component="main" maxWidth="xs">
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        {status === 'success' && <RequestSuccess success="Bien entendu chef !" />}
        <RequestErrors error={error} />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="email"
          label="Email"
          name="email"
          disabled
          value={user && user.email}
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
            Enregistrer
          </Button>
        )}
      </form>
    </Container>
  );
}
