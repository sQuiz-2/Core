import { Difficulties, GetGame, GetGames } from '@squiz/shared';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Spinner from 'src/components/Spinner';
import { ActionsCell, CellProps, DropDownCell, EditableCell, Table } from 'src/components/Table';

import RequestErrors from '../components/RequestErrors';
import { get, put, remove } from '../tools/WrappedFetch';

export default function Games() {
  const difficulties = useMemo(
    (): { id: number; name: string }[] => Difficulties.map(({ id, name }) => ({ id, name })),
    []
  );
  const [displayData, setDisplayData] = useState<GetGames>([]);
  const { isLoading, isError, data = [], error } = useQuery(
    'users',
    () => {
      return get<GetGames>('games');
    },
    { retry: 1, refetchOnMount: true }
  );
  const [gameEdit] = useMutation((body: GetGame) => put('games/' + body.id, body));
  const [gameDelete] = useMutation((id: number) => remove('games/' + id));
  const columns = useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'Titre',
        accessor: 'title',
        Cell: ({ value, row, column }: CellProps) =>
          EditableCell({ value, row, column, updateData }),
      },
      {
        Header: 'Difficulté',
        accessor: 'difficultyId',
        Cell: ({ value, row, column }: CellProps) =>
          DropDownCell({ value, row, column, updateData, selectData: difficulties }),
      },
      {
        Header: 'Actions',
        id: 'Actions',
        Cell: ({ row, column }: CellProps) => ActionsCell({ row, column, removeData }),
      },
    ],
    [displayData]
  );

  useEffect(() => {
    if (data.length < 1) return;
    setDisplayData(data);
  }, [data]);

  async function removeData(rowIndex: number) {
    const row = displayData.find((_row, index) => index === rowIndex);
    if (!row) return;
    try {
      await gameDelete(row.id);
      const updatedData = displayData.filter((data) => data.id !== row.id);
      setDisplayData(updatedData);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData(rowIndex: number, columnId: string, value: any) {
    const updatedRow = { ...displayData[rowIndex], [columnId]: value };
    const updatedData = displayData.map((row, index) => {
      if (index === rowIndex) {
        return updatedRow;
      }
      return row;
    });
    setDisplayData(updatedData);
    try {
      await gameEdit(updatedRow);
    } catch (error) {
      console.log(error);
    }
  }

  if (isError) {
    return <RequestErrors error={error} />;
  } else if (isLoading) {
    return <Spinner />;
  } else {
    return <Table columns={columns} data={displayData} />;
  }
}
