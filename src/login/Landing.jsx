/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '@iconify/react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import AccountPage from './AccountPage.jsx';
import UserSignUp from './UserSignUp.jsx';

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-content: space-evenly;
  height: 500px;
  width: 500px;
  background-color: #686868;
  border:solid;
  border-radius: 25px;
  box-shadow: 5px 5px 10px;
`;

const LandingButton = styled.button`
  height: 100px;
  width: 200px;
`;

const Landing = () => {
  const [addUserToggle, setAddUserToggle] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const logoutWithRedirect = () => logout({
    returnTo: window.location.origin,
  });

  const login = () => {
    loginWithRedirect({});
  };
  console.log(user);
  useEffect(() => {
    axios.get('/user')
      .then((data) => {
        if (data.data.email === user.email) {
          console.log('send to account page');
        } else {
          console.log('send to create user page');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const addUser = () => {
    setAddUserToggle(true);
  };

  return (
    <>
      {!isAuthenticated
      && (
      <Container>
        <div>
          <Icon icon="mdi:bird" color="#d9f0ff" width="100" height="100" />
        </div>
        {/* Need to create functionality that will check if the user already exists in our
        database.  If they click on login and don't exist in our page, it will take them to the
        create user page. */}
        <LandingButton onClick={() => login()}>Login</LandingButton>
        <div>Don't Have An Account?</div>
        <LandingButton onClick={() => { addUser(); }}>Create Account</LandingButton>
        {addUserToggle
        && <UserSignUp setAddUserToggle={setAddUserToggle} />}
      </Container>
      )}
      {isAuthenticated
      && <AccountPage logoutWithRedirect={logoutWithRedirect} />}
    </>
  );
};

export default Landing;