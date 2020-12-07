import Alert from '@material-ui/lab/Alert/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle/AlertTitle';
import React from 'react';

export default function RequestErrors({ error }: { error: any }) {
  if (!error) return null;
  return (
    <Alert severity="error">
      <AlertTitle>Une erreur est survenue</AlertTitle>
      {(error as any)?.errors?.length &&
        (error as any).errors.map((err: any) => <p key={err.message}>- {err.message}</p>)}
    </Alert>
  );
}
