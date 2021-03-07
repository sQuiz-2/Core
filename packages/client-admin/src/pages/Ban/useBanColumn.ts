import { useMemo } from 'react';
import { ActionsCell, CellProps } from 'src/components/Table';

type useGameColumnProp = {
  displayData: any;
  removeData: (rowIndex: number) => void;
};

export default function useBanColumn({ displayData, removeData }: useGameColumnProp) {
  const columns = useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'Joueur',
        accessor: 'username',
      },
      {
        Header: 'Raison',
        accessor: 'banReason',
      },
      {
        Header: 'Actions',
        id: 'Actions',
        Cell: ({ row, column }: CellProps) => ActionsCell({ row, column, removeData }),
      },
    ],
    [displayData]
  );

  return columns;
}
