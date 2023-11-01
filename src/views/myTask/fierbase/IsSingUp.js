import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function IsSingUp() {
  const getUser = localStorage.getItem('user');

  return <div>{getUser ? <Outlet /> : <Navigate to={'/fierbase/signup'} />}</div>;
}

export default IsSingUp;
