import { ChangeEvent } from 'react';

import { CellProps } from './EditableCell';

export interface DropDownCellProps extends CellProps {
  updateData: (index: number, id: string, data: any) => void;
  selectData: { id: number; name: string | number }[];
}

export function DropDownCell({
  value: initialValue,
  row: { index },
  column: { id },
  updateData,
  selectData,
}: DropDownCellProps) {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateData(index, id, e.target.value);
  };

  return (
    <select value={initialValue} onChange={onChange}>
      {selectData.map(({ id, name }) => (
        <option value={id} key={id}>
          {name}
        </option>
      ))}
    </select>
  );
}
