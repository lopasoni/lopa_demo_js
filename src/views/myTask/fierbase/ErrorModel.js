import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function ErrorModel(props) {
  const [open, setOpen] = React.useState(false);

  console.log(open);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{props.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              props.onOk();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ErrorModel;
