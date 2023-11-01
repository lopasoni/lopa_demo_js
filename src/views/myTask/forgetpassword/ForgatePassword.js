import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToast } from 'redux/slice/tostSlice';
import { error, succes } from 'App';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const ForgatePassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const [token, setToken] = useState(false);
  const url = window.location.href;
  const neviget = useNavigate();

  useEffect(() => {
    if (url.split('?')[1]) {
      setToken(url.split('?')[1]);
    } else {
      setToken(false);
    }
  }, [url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(`${process.env.REACT_APP_BASE_URL}/SendLink`, {
        email
      });

      responce.data.message &&
        dispatch(
          setToast({
            type: succes,
            msg: responce.data.message
          })
        );

      if (responce.data.message) {
        neviget('/pages/login/login3');
      }

      responce.data.error &&
        dispatch(
          setToast({
            type: error,
            msg: responce.data.error.message
          })
        );
      setEmail('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        password
      };
      const config = {
        headers: {
          Authorization: `${token}`
        }
      };
      const responce = await axios.post(`${process.env.REACT_APP_BASE_URL}/ForgetPassword`, body, config);
      responce.data.message &&
        dispatch(
          setToast({
            type: succes,
            msg: responce.data.message
          })
        );

      responce.data.error &&
        dispatch(
          setToast({
            type: error,
            msg: responce.data.error.message
          })
        );

      if (responce.data.message) {
        neviget('/pages/login/login3');
      }

      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid container direction="column" justifyContent="center" height={'100vh'} alignItems="center">
      <Container maxWidth="xs">
        {!token && (
          <form style={{ border: '1px solid gray', padding: '40px', borderRadius: '20px' }} onSubmit={handleSubmit}>
            <Typography variant="h3" align="center">
              Forgot Password
            </Typography>
            <TextField
              style={{ marginBlock: '20px' }}
              margin="normal"
              label="Email"
              fullWidth
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" fullWidth variant="contained" color="secondary">
              Submit
            </Button>
          </form>
        )}

        {token && (
          <form style={{ border: '1px solid gray', padding: '40px', borderRadius: '20px' }} onSubmit={handleResetSubmit}>
            <Typography variant="h3" align="center">
              Reset Password
            </Typography>
            <TextField
              style={{ marginBlock: '20px' }}
              margin="normal"
              type="password"
              label="Password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" fullWidth variant="contained" color="secondary">
              Submit
            </Button>
          </form>
        )}
      </Container>
    </Grid>
  );
};

export default ForgatePassword;
