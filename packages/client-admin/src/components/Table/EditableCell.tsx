import { ChangeEvent, useEffect, useState } from 'react';

export type CellProps = {
  value: any;
  row: { index: number };
  column: { id: string };
};

export interface EditableCellProps extends CellProps {
  updateData: (index: number, id: string, data: any) => void;
}

export function EditableCell({
  value: initialValue,
  row: { index },
  column: { id },
  updateData,
}: EditableCellProps) {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
}
