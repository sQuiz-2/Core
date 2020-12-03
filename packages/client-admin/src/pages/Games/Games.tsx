import { GetGame } from '@squiz/shared';
import { useCallback, useState } from 'react';
import { Table } from 'src/components/Table';
import useFetchPage from 'src/hooks/useFetchPage';
import useRemoveRow from 'src/hooks/useRemoveRow';
import useUpdateRow from 'src/hooks/useUpdateRow';

import useGameColumn from './useGameColumn';

export default function Games() {
  const { fetchPage, maxPage } = useFetchPage<GetGame[]>('games');
  const [displayData, setDisplayData] = useState<GetGame[]>([]);
  const { removeRow } = useRemoveRow<GetGame>(displayData, setDisplayData, 'games/');
  const { updateRow } = useUpdateRow<GetGame>(displayData, setDisplayData, 'games/');
  const columns = useGameColumn({ displayData, updateData: updateRow, removeData: removeRow });

  const fetchData = useCallback(async ({ pageSize, pageIndex }) => {
    const data = await fetchPage(pageIndex, pageSize);
    if (!data) return;
    setDisplayData(data);
  }, []);

  return <Table columns={columns} data={displayData} fetchData={fetchData} maxPage={maxPage} />;

  /*   if (isError) {
    return <RequestErrors error={error} />;
  } else if (isLoading) {
    return <Spinner />;
  } else {
    
  } */
}
