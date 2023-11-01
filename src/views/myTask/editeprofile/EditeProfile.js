import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upadateProfile } from 'redux/slice/authnticationSlice';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import profilePhoto from '../../../assets/images/custom/defualtprofile.png';
import { useEffect } from 'react';
import { fetchLoginUserData } from 'redux/slice/otherSlice';

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

function EditeProfile() {
  const dispach = useDispatch();
  const userdDetails = useSelector((state) => state.otherSlice.loginUserData);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    image: ''
  });
  const [finalImage, setFinalImage] = useState('');

  const [file, setFile] = useState(null);

  useEffect(() => {
    dispach(fetchLoginUserData());
  }, []);

  useEffect(() => {
    setFormData({
      first_name: userdDetails?.first_name,
      last_name: userdDetails?.last_name,
      email: userdDetails?.email,
      image: userdDetails?.image
    });

    setFinalImage(userdDetails?.image);
  }, [userdDetails]);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setFormData({ ...formData, image: selectedFile });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('first_name', formData.first_name);
    formDataToSend.append('last_name', formData.last_name);
    formDataToSend.append('email', formData.email);

    if (file) {
      formDataToSend.append('image', formData.image);
    }

    dispach(upadateProfile(formDataToSend));

    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      image: ''
    });
    setFile(null);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Update Your Profile
        </Typography>
        <Grid container spacing={2}>
          <Container style={{ marginTop: '20px' }} maxWidth="sm">
            <label htmlFor="imageInput" style={labelStyle}>
              <img
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                src={file ? file : formData.image ? `${process.env.REACT_APP_BASE_URL}/${finalImage}` : profilePhoto}
                alt=""
              />
            </label>
            <input name="image" type="file" id="imageInput" accept="image/*" onChange={handleFileInputChange} style={inputStyle} />
          </Container>

          <Grid item xs={6}>
            <TextField label="First Name" name="first_name" fullWidth value={formData.first_name} onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Last Name" name="last_name" fullWidth value={formData.last_name} onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" name="email" fullWidth value={formData.email} onChange={handleInputChange} required />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="secondary" style={{ marginTop: '20px' }}>
          Update Profile
        </Button>
      </form>
    </Container>
  );
}

export default EditeProfile;
