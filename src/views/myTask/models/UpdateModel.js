import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

function UpdateModel(props) {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: props.dataUp.name,
    email: props.dataUp.email,
    password: props.dataUp.password
  });

  console.log(open);

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

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
      <Modal open={true} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            UpdateData data!!!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Fill data you wnat to update
          </Typography>
          <TextField
            onChange={handleChange}
            value={formData.name}
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Enter the name"
            type="name"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleChange}
            value={formData.email}
            autoFocus
            margin="dense"
            id="name"
            label="Enter the email"
            type="email"
            fullWidth
            name="email"
            variant="standard"
          />
          <TextField
            onChange={handleChange}
            value={formData.password}
            autoFocus
            margin="dense"
            id="name"
            label="Enter the password"
            name="password"
            type="password"
            fullWidth
            variant="standard"
          />

          <div style={{ marginTop: '20px', textAlign: 'end' }}>
            <Button
              onClick={() => {
                props.UpdateData(props.index, formData);
                handleClose();
                props.closeModal();
              }}
            >
              Update
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

export default UpdateModel;
