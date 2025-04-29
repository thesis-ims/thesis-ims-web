import React, { useState } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

export default function SnackbarToast({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
}) {
  // const [open, setOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = <div>test</div>;

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message="Note archived"
      action={action}
    />
  );
}
