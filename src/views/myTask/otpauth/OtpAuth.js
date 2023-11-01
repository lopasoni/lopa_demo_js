import React from 'react';
import { Container, Button, Typography, Grid } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCodeGenerator from '../../../custom-component/QRCodeGenerator';
import axios from 'axios';
import { error, succes } from 'App';
import { setToast } from 'redux/slice/tostSlice';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { handleLogout } from 'redux/slice/authnticationSlice';
import OtpInput from 'react-otp-input';

function OtpAuth() {
  const data = useSelector((state) => state.authnticationSlice.login);
  const dispatch = useDispatch();
  const neviget = useNavigate();
  const loginData = useSelector((state) => state.authnticationSlice.login);
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const url = data?.responce?.data?.secret?.otpauth_url;
  const email = data?.responce?.data?.email;
  const token = data?.responce?.data?.auth_token;

  useEffect(() => {
    if (loginData?.type !== 'NAVIGATE_TO_DASHBOARD') {
      navigate('/pages/login/login3');
      return;
    }
  }, [loginData]);

  useEffect(() => {
    if (otp.length === 6) {
      handleEnterClick();
    }
  }, [otp]);

  const NevigetLogin = async () => {
    try {
      const config = {
        headers: {
          Authorization: `${token}`
        }
      };

      const responce = await axios.post(`${process.env.REACT_APP_BASE_URL}/Logout`, undefined, config);

      if (responce.data.message) {
        dispatch(handleLogout());
        neviget('/pages/login/login3');
        setToast({
          type: succes,
          msg: responce.data.message
        });
      }

      responce.data.error &&
        thunkapi.dispatch(
          setToast({
            type: error,
            msg: responce.data.error.codeName
          })
        );
      console.log(responce);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnterClick = async (e = undefined) => {
    if (e) {
      e.preventDefault();
    }

    try {
      const body = {
        secretkey: otp,
        email
      };
      const responce = await axios.post(`${process.env.REACT_APP_BASE_URL}/VerifyOtp`, body);

      responce.data.error &&
        dispatch(
          setToast({
            type: error,
            msg: responce.data.error.message
          })
        );

      responce.data.message &&
        dispatch(
          setToast({
            type: succes,
            msg: responce.data.message
          })
        );

      if (responce.data.data.auth_token) {
        const data = responce.data.data.auth_token;
        localStorage.setItem('loginData', data);
        localStorage.setItem('logintype', 'withapi');
        neviget('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container direction="column" justifyContent="center" height={'100vh'} alignItems="center">
      <Container maxWidth="xs">
        {url && (
          <>
            <Typography variant="h3" align="center">
              Scan the barcode
            </Typography>
            <div style={{ marginBlock: '20px', textAlign: 'center' }}>
              <QRCodeGenerator url={url} />
            </div>
          </>
        )}
        <form style={{ border: '1px solid gray', padding: '40px', borderRadius: '20px' }} onSubmit={handleEnterClick}>
          <Typography variant="h3" align="center">
            Enter the otp
          </Typography>
          <div style={{ display: 'flex', gap: '10px', marginBlock: '15px' }}>
            <OtpInput
              shouldAutoFocus={true}
              containerStyle={{ width: '100%' }}
              inputStyle={{ padding: '12px', width: '16%' }}
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <Button onClick={handleEnterClick} type="submit" fullWidth variant="contained" color="secondary">
            Submit
          </Button>
        </form>
        <Button style={{ marginBlock: '14px', width: '40%' }} onClick={NevigetLogin} fullWidth variant="contained" color="error">
          Back
        </Button>
      </Container>
    </Grid>
  );
}

export default OtpAuth;
