import Delete from '@material-ui/icons/Delete';

export interface ActionsCellProps {
  row: { index: number };
  column: { id: string };
  removeData?: (rowIndex: number) => void;
}

export function ActionsCell({ row: { index }, removeData }: ActionsCellProps) {
  return (
    <>
      {removeData && (
        <button onClick={() => removeData(index)}>
          <Delete className="hover:text-red-500" />
        </button>
      )}
    </>
  );
}
