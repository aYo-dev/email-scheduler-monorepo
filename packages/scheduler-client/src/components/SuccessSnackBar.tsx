import { Alert, Snackbar } from "@mui/material";

interface EmailScheduleFormProps {
  open: boolean;
  handleClose: (v: boolean) => void
};

export const SuccessSnackBar = ({open, handleClose}: EmailScheduleFormProps) => {
  const handleSuccessMsgClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    handleClose(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleSuccessMsgClose}
    >
      <Alert onClose={handleSuccessMsgClose} severity="success">
        Email was successfuly scheduled!
      </Alert>
    </Snackbar>
  );

}