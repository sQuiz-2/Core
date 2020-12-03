import { useMutation } from 'react-query';

import { put } from '../tools/WrappedFetch';

interface Data {
  id: number;
}

export default function useUpdateRow<T extends Data>(
  displayData: T[],
  setDisplayData: (d: T[]) => void,
  path: string
) {
  const [gameEdit, { error }] = useMutation((body: T) => put(path + body.id, body));

  async function updateRow(rowIndex: number, columnId: string, value: any) {
    const updatedRow = { ...displayData[rowIndex], [columnId]: value };
    const updatedData = displayData.map((row, index) => {
      if (index === rowIndex) {
        return updatedRow;
      }
      return row;
    });
    setDisplayData(updatedData);
    await gameEdit(updatedRow);
  }

  return { updateRow, error };
}
