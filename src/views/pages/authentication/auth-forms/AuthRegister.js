import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { succes } from 'App';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider, fbProvider } from 'utils/fierbaseConfig';
import { setToast } from 'redux/slice/tostSlice';
import { fetchSignUpData } from 'redux/slice/authnticationSlice';
import { useRef } from 'react';
import profile from '../../../../assets/images/custom/defualtprofile.png';

// ===========================|| FIREBASE - REGISTER ||=========================== //
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

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const neviget = useNavigate();
  const dispach = useDispatch();
  const fileInputRef = useRef();
  const [file, setFile] = useState();
  const [profileimage, setProfileImage] = useState('');

  const googleHandler = async () => {
    try {
      signInWithPopup(auth, provider)
        .then((data) => {
          const localStorageData = JSON.stringify(data.user);
          localStorage.setItem('loginData', localStorageData);
          dispach(
            setToast({
              type: succes,
              msg: 'user registerd sucessfully'
            })
          );
          neviget('/');
        })
        .catch((e) => setError(e.message));
    } catch (error) {
      console.log(error);
    }
  };

  const faceBookHandler = async () => {
    try {
      signInWithPopup(auth, fbProvider)
        .then((data) => {
          const localStorageData = JSON.stringify(data.user);
          localStorage.setItem('loginData', localStorageData);
          dispach(
            setToast({
              type: succes,
              msg: 'user registerd sucessfully'
            })
          );
          neviget('/');
        })
        .catch((e) => setError(e.message));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setProfileImage(selectedFile);
    }
  };
  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              variant="outlined"
              fullWidth
              onClick={googleHandler}
              size="large"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
              </Box>
              Sign up with Google
            </Button>
          </AnimateButton>
          <AnimateButton>
            <Button
              style={{ marginTop: '20px' }}
              variant="outlined"
              fullWidth
              onClick={faceBookHandler}
              size="large"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img
                  src={'https://img.freepik.com/premium-vector/blue-social-media-logo_197792-1759.jpg'}
                  alt="google"
                  width={16}
                  height={16}
                  style={{ marginRight: matchDownSM ? 8 : 16 }}
                />
              </Box>
              Sign up with Face book
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`
              }}
              disableRipple
              disabled
            >
              OR
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          image: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required('First name is required'),
          last_name: Yup.string().required('Last name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            const formData = new FormData();

            formData.append('first_name', values.first_name);
            formData.append('last_name', values.last_name);
            formData.append('email', values.email);
            formData.append('password', values.password);

            if (profileimage) {
              formData.append('image', profileimage);
            }

            dispach(fetchSignUpData(formData));

            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
            setFile(null);
            fileInputRef.current.value = null;

            resetForm();
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid item>
              <label htmlFor="imageInput" style={labelStyle}>
                <img style={{ width: '100%', height: '100%', borderRadius: '50%' }} src={file ? file : profile} alt="" />
              </label>
              <input
                name="image"
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleFileInputChange}
                style={inputStyle}
                ref={fileInputRef}
                value={values.image}
              />
            </Grid>

            <FormControl fullWidth error={Boolean(touched.first_name && errors.first_name)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">First name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                value={values.first_name}
                name="first_name"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.first_name && errors.first_name && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.first_name}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.last_name && errors.last_name)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Last name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                value={values.last_name}
                name="last_name"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.last_name && errors.last_name && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.last_name}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
