import { GetUsers } from '@squiz/shared';
import React from 'react';
import { useQuery } from 'react-query';
import Spinner from 'src/components/Spinner';
import Table from 'src/components/Table';

import RequestErrors from '../components/RequestErrors';
import { get } from '../tools/WrappedFetch';

const columns = [
  {
    Header: 'id',
    accessor: 'id',
  },
  {
    Header: 'Titre',
    accessor: 'title',
  },
  {
    Header: 'Difficulté',
    accessor: 'difficulty.name',
  },
];

export default function Games() {
  const { isLoading, isError, data = [], error } = useQuery(
    'users',
    async () => {
      return get<GetUsers>('games');
    },
    { retry: 1 }
  );

  if (isError) {
    return <RequestErrors error={error} />;
  } else if (isLoading) {
    return <Spinner />;
  } else {
    return <Table columns={columns} data={data} />;
  }
}
