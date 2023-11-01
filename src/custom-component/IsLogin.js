import React from 'react';
import { Navigate, Outlet } from 'react-router';

function IsLogin() {
  const token = localStorage.getItem('loginData');
  return <div>{token ? <Outlet /> : <Navigate to={'/pages/login/login3'} />}</div>;
}

export default IsLogin;
