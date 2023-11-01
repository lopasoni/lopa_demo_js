import React, { useState } from 'react';
import '../signup/Signup.scss';
import { signInWithPopup } from 'firebase/auth';
import { auth, fbProvider, provider } from '../../../../utils/fierbaseConfig';
import { useNavigate } from 'react-router-dom';
import SignupModel from '../../fierbase/SignupModel';
import ErrorModel from '../ErrorModel';

function Signup() {
  const [userData, setUserData] = useState(false);
  const [error, setError] = useState(false);
  const nevigate = useNavigate();

  const setNaviget = () => {
    nevigate('/fierbase/home');
  };

  const handleSubmitWithGoogle = () => {
    try {
      signInWithPopup(auth, provider)
        .then((data) => {
          const localStorageData = JSON.stringify(data.user);
          localStorage.setItem('user', localStorageData);
          setUserData(true);
        })
        .catch((e) => setError(e.message));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitWithFb = () => {
    try {
      signInWithPopup(auth, fbProvider)
        .then((data) => {
          const localStorageData = JSON.stringify(data.user);
          localStorage.setItem('user', localStorageData);
          setUserData(true);
        })
        .catch((e) => setError(e.message));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fierBase">
      <button onClick={handleSubmitWithGoogle} className="signup-btn">
        Signupwithgoogle
      </button>

      <button onClick={handleSubmitWithFb} className="signup-btn">
        Signupwithfacebook
      </button>

      {userData && <SignupModel onOk={() => setNaviget()} />}
      {error && <ErrorModel message={error} onOk={() => setError(false)} />}
    </div>
  );
}

export default Signup;
