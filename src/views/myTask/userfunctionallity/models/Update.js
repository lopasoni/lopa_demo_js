import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Container } from '@mui/system';
import { useEffect } from 'react';

export default function Update(props) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    image: ''
  });
  const [file, setFile] = useState(null);
  const [finalImage, setFinalImage] = useState('');

  useEffect(() => {
    setFormData({
      first_name: props.data.first_name,
      last_name: props.data.last_name,
      email: props.data.email
    });
    setFinalImage(props.data?.image);
  }, []);

  const labelStyle = {
    height: '100px',
    width: '100px',
    fontSize: '1rem',
    display: 'block',
    borderRadius: '50%',
    border: '1px dashed black',
    color: 'black',
    cursor: 'pointer',
    marginBottom: '10px'
  };

  const inputStyle = {
    display: 'none'
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setFormData({ ...formData, image: selectedFile });
    }
  };

  const handleSubmit = () => {
    const formDataToSend = new FormData();
    if (formData.first_name) {
      formDataToSend.append('first_name', formData.first_name);
    }
    if (formData.last_name) {
      formDataToSend.append('last_name', formData.last_name);
    }
    if (formData.email) {
      formDataToSend.append('email', formData.email);
    }
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
    formDataToSend.append('_id', props.data._id);
    props.updateUser(formDataToSend);
  };
  return (
    <div>
      <Dialog open={props.initialOpen}>
        <DialogTitle sx={{ fontSize: '1.1rem' }}>ADD USER</DialogTitle>
        <DialogContent>
          <Container style={{ marginTop: '20px' }} maxWidth="sm">
            <label htmlFor="imageInput" style={labelStyle}>
              <img
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                src={file ? file : `${process.env.REACT_APP_BASE_URL}/${finalImage}`}
                alt=""
              />
            </label>
            <input name="image" type="file" id="imageInput" accept="image/*" onChange={handleFileInputChange} style={inputStyle} />
          </Container>
          <TextField
            onChange={handleChange}
            value={formData.first_name}
            name="first_name"
            autoFocus
            margin="normal"
            id="name"
            label=" First name"
            type="text"
            fullWidth
            color="error"
            variant="outlined"
          />
          <TextField
            onChange={handleChange}
            value={formData.last_name}
            name="last_name"
            margin="normal"
            id="name"
            label="Last name"
            type="text"
            fullWidth
            color="error"
            variant="outlined"
          />
          <TextField
            onChange={handleChange}
            value={formData.email}
            name="email"
            margin="normal"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            color="error"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              props.handleclose();
            }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() => {
              handleSubmit();
              props.handleclose();
            }}
          >
            UPDATE USER
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
