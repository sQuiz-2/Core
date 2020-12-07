import { useMemo } from 'react';
import { ActionsCell, CellProps, DropDownCell, EditableCell } from 'src/components/Table';
import useDifficulties from 'src/hooks/useDifficulties';

type useGameColumnProp = {
  displayData: any;
  updateData: (index: number, id: string, data: any) => void;
  removeData: (rowIndex: number) => void;
};

export default function useGameColumn({ displayData, updateData, removeData }: useGameColumnProp) {
  const difficulties = useDifficulties();

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

  return columns;
}
