import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import Add from '@material-ui/icons/Add';
import React from 'react';
import { useQuery } from 'react-query';

import RequestErrors from '../components/RequestErrors';
import client from '../tools/WrappedFetch';

const columns: ColDef[] = [
  { field: 'id' },
  { field: 'email', headerName: 'email', width: 200 },
  { field: 'actions', headerName: 'Actions', sortable: false },
];

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Users() {
  const classes = useStyles();
  const { isLoading, isError, data, error } = useQuery(
    'users',
    () => {
      return client('users', null, { method: 'GET' });
    },
    { retry: 1 }
  );

  if (isError) {
    return <RequestErrors error={error} />;
  }

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.button} startIcon={<Add />}>
        Créer
      </Button>
      <div style={{ height: '80vh', width: '100%' }}>
        <DataGrid rows={data ? data : []} columns={columns} loading={isLoading} />
      </div>
    </div>
  );
}
