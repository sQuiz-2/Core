import { useEffect, Fragment } from 'react';
// @ts-ignore
import { useTable, usePagination } from 'react-table';

export function Table({ columns, data, fetchData, maxPage, renderRowSubComponent }: any) {
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
    setPageSize,
    visibleColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
      manualPagination: true,
      pageCount: maxPage,
    },
    usePagination
  );

  useEffect(() => {
    fetchData({ pageIndex: pageIndex + 1, pageSize });
  }, [fetchData, pageIndex, pageSize]);

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
          <tbody {...getTableBodyProps()} className="bg-white border-2 border-black">
            {page.map((row: any, i: number) => {
              prepareRow(row);
              return (
                <Fragment key={row.values.id}>
                  <tr className={`${i % 2 ? 'bg-blue-100' : 'bg-red-100'}`}>
                    {row.cells.map((cell: any) => {
                      return (
                        <td
                          className="text-left p-2 border-t-2 border-2 border-black"
                          {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                  {renderRowSubComponent && (
                    <tr className={`${i % 2 ? 'bg-blue-100' : 'bg-red-100'}`}>
                      <td colSpan={visibleColumns.length}>{renderRowSubComponent({ row })}</td>
                    </tr>
                  )}
                </Fragment>
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
            {pageIndex + 1} sur {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
