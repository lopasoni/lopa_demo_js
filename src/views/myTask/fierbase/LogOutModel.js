import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  console.log(open);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{`Are you sure you wan't to logout?`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              props.closeModel();
            }}
          >
            cancle
          </Button>
          <Button
            onClick={() => {
              props.closeModel();
              handleClose();
              props.onLogOutClick();
            }}
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
