import { GetThemes } from '@squiz/shared';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { ActionsCell, CellProps, DropDownCell, EditableCell } from 'src/components/Table';
import useDifficulties from 'src/hooks/useDifficulties';
import { get } from 'src/tools/WrappedFetch';

type useReportedColumnProp = {
  displayData: any;
  updateData: (index: number, id: string, data: any) => void;
  removeData: (rowIndex: number) => void;
};

export default function useReportedColumn({
  displayData,
  updateData,
  removeData,
}: useReportedColumnProp) {
  const difficulties = useDifficulties();
  const selectGuesses = [
    { id: 1, title: 1 },
    { id: 2, title: 2 },
    { id: 3, title: 3 },
    { id: 4, title: 4 },
  ];
  const { data: themes } = useQuery('themes', () => {
    return get<GetThemes>('themes');
  });

  const columns = useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'Question',
        accessor: 'question',
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
        Header: 'Thème',
        accessor: 'themeId',
        Cell: ({ value, row, column }: CellProps) =>
          DropDownCell({ value, row, column, updateData, selectData: themes || [] }),
      },
      {
        Header: 'Essais',
        accessor: 'maxNumberOfGuesses',
        Cell: ({ value, row, column }: CellProps) =>
          DropDownCell({ value, row, column, updateData, selectData: selectGuesses }),
      },
      {
        Header: 'Actions',
        id: 'Actions',
        Cell: ({ row, column }: CellProps) => ActionsCell({ row, column, removeData }),
      },
      {
        Header: () => null,
        accessor: 'answers',
        Cell: () => null,
      },
    ],
    [displayData, themes]
  );

  return columns;
}
