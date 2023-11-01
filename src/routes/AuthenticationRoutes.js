import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const ForgatePassword = Loadable(lazy(() => import('views/myTask/forgetpassword/ForgatePassword')));
const OtpAuth = Loadable(lazy(() => import('views/myTask/otpauth/OtpAuth')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login/login3',
      element: <AuthLogin3 />
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
    },
    //forget passswprd
    {
      path: 'forgetPassword',
      children: [
        {
          path: '',
          element: <ForgatePassword />
        }
      ]
    },
    //otp
    {
      path: 'optauth',
      children: [
        {
          path: '',
          element: <OtpAuth />
        }
      ]
    }
  ]
};

export default AuthenticationRoutes;
