import React, { useEffect, useState } from 'react';
import '../homepage/HomePage.scss';
import { useNavigate } from 'react-router-dom';
import LogOutModel from '../../fierbase/LogOutModel';
import { auth } from '../../../../utils/fierbaseConfig';

function HomePage() {
  const [user, setUserData] = useState('');
  const [logOut, setLogOut] = useState(false);
  const neviget = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const userParse = JSON.parse(user);
    setUserData(userParse);
  }, []);

  const handleLogOut = () => {
    const user = auth.currentUser;
    if (user) {
      user
        .delete()
        .then(() => {
          localStorage.removeItem('user');
          neviget('/fierbase/signup');
        })
        .catch((error) => {
          console.error('Error deleting account:', error);
        });
    } else {
      console.error('No user is currently authenticated.');
    }
  };

  return (
    <div className="Homepage">
      <div className="btn-div">
        <button onClick={() => setLogOut(true)} className="button-primary">
          SignOut
        </button>
      </div>

      <h2>User data</h2>
      <div className="userDiv">
        <div className="imagediv">
          <img src={user?.photoURL} alt="" />
        </div>
        <p>{user?.displayName}</p>
        <p>{user?.email}</p>
      </div>
      {logOut && <LogOutModel closeModel={() => setLogOut(false)} onLogOutClick={() => handleLogOut()} />}
    </div>
  );
}

export default HomePage;
