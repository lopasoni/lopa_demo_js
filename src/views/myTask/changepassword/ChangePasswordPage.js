import React from 'react';
import { TextField, Button, Container, Typography, CssBaseline } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { changePassword } from 'redux/slice/otherSlice';

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    password: yup.string().required('Old password is required'),
    Newpassword: yup.string().required('New password is required'),
    ConfirmNewpassword: yup
      .string()
      .oneOf([yup.ref('Newpassword')], 'Passwords must match')
      .required('Confirm password is required')
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      Newpassword: '',
      ConfirmNewpassword: ''
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(changePassword(values));
      resetForm();
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Old Password"
            type="password"
            name="password"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            label="New Password"
            type="password"
            name="Newpassword"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.Newpassword}
            error={formik.touched.Newpassword && Boolean(formik.errors.Newpassword)}
            helperText={formik.touched.Newpassword && formik.errors.Newpassword}
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="ConfirmNewpassword"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.ConfirmNewpassword}
            error={formik.touched.ConfirmNewpassword && Boolean(formik.errors.ConfirmNewpassword)}
            helperText={formik.touched.ConfirmNewpassword && formik.errors.ConfirmNewpassword}
          />
          <Button style={{ marginBlock: '10px', paddingBlock: '10px' }} type="submit" fullWidth variant="contained" color="secondary">
            Change Password
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ChangePasswordPage;
