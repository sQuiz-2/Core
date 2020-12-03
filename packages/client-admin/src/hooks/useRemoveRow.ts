import { useMutation } from 'react-query';

import { remove } from '../tools/WrappedFetch';

interface Data {
  id: number;
}

export default function useRemoveRow<T extends Data>(
  displayData: T[],
  setDisplayData: (d: T[]) => void,
  path: string
) {
  const [gameDelete, { error }] = useMutation((id: number) => remove(path + id));

  async function removeRow(rowIndex: number) {
    const row = displayData.find((_row, index) => index === rowIndex);
    if (!row) return;
    await gameDelete(row.id);
    const updatedData = displayData.filter((data) => data.id !== row.id);
    setDisplayData(updatedData);
  }

  return { removeRow, error };
}
