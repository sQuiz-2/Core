import { GetGame } from '@squiz/shared';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { Table } from 'src/components/Table';
import useFetchPage from 'src/hooks/useFetchPage';
import useRemoveRow from 'src/hooks/useRemoveRow';

import useBanColumn from './useBanColumn';

export default function Ban() {
  const form = useRef<HTMLFormElement | null>(null);
  const { fetchPage, maxPage } = useFetchPage<GetGame[]>('users');
  const [displayData, setDisplayData] = useState<GetGame[]>([]);
  const { removeRow } = useRemoveRow<GetGame>(displayData, setDisplayData, 'users/ban/');
  const columns = useBanColumn({ displayData, removeData: removeRow });

  const fetchData = useCallback(async ({ pageIndex = 1, pageSize = 5, playerSearch = '' }) => {
    const data = await fetchPage(pageIndex, pageSize, `playerSearch=${playerSearch}&banned=true`);
    if (!data) return;
    setDisplayData(data);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.current) return;
    const { playerSearch } = form.current;
    fetchData({ playerSearch: playerSearch.value });
  }

  return (
    <>
      <form ref={(ref) => (form.current = ref)} onSubmit={handleSubmit}>
        <input name="playerSearch" placeholder="Joueur" type="text" />
        <button> Chercher </button>
      </form>
      <Table columns={columns} data={displayData} fetchData={fetchData} maxPage={maxPage} />
    </>
  );
}
