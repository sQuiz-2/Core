// @ts-ignore
import { useTable, usePagination } from 'react-table';

export function Table({ columns, data }: any) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <div className="max-w-full">
        <table
          {...getTableProps()}
          className="min-w-full table-auto border-collapse shadow rounded-lg bg-gray-100">
          <thead className="border-b-2">
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th {...column.getHeaderProps()} className="text-left p-2">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white">
            {page.map((row: any, i: number) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-100">
                  {row.cells.map((cell: any) => {
                    return (
                      <td {...cell.getCellProps()} className="text-left p-2 border-b-2">
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pt-4">
        <button
          className="p-2 shadow rounded-lg border-gray-100 hover:bg-gray-200"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button
          className="p-2 shadow rounded-lg border-gray-100 hover:bg-gray-200"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button
          className="p-2 shadow rounded-lg border-gray-100 hover:bg-gray-200"
          onClick={() => nextPage()}
          disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button
          className="p-2 shadow rounded-lg border-gray-100 hover:bg-gray-200"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
    </>
  );
}
