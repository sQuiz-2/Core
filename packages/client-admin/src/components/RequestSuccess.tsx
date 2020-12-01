import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert/Alert';
import React, { useState } from 'react';

export default function RequestSuccess({ success }: { success: string }) {
  const [open, setOpen] = useState(true);

  function handleClose() {
    setOpen(false);
  }

  if (!success) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert onClose={handleClose} severity="success">
        {success}
      </Alert>
    </Snackbar>
  );
}
