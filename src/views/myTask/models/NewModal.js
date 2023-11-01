import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function NewModal(props) {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };
  console.log(props);
  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Delete data!!!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Are you sure you wnat't to delete`}
          </Typography>
          <div style={{ marginTop: '20px', textAlign: 'end' }}>
            <Button
              onClick={() => {
                handleClose();
                props.closeModal();
                props.dataDeleteData(props.data);
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                handleClose();
                props.closeModal();
              }}
            >
              Cancle
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default NewModal;
