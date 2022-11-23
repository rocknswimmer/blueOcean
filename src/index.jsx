/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
// Bring React in to build a component.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import Auth0ProviderWithHistory from './login/auth0-provider-with-history.jsx';
import AccountPage from './login/AccountPage.jsx';
import UserSignUp from './login/UserSignUp.jsx';
import BirdList from './BirdList.jsx';
import FriendsList from './FriendsList.jsx';
// Import from react-dom the ability to create a root render
import App from './App.jsx';
import './assets/index.css';

const MainComponent = () => {
  const [globalUser, setGlobalUser] = useState({});
  const [userID, setUserID] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const history = useHistory();

  const returnToAccountPage = () => {
    history.push('/user');
  };

  useEffect(() => {
    axios.get('/allUsers')
      .then((data) => {
        setAllUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get('/userID', { params: { email: globalUser.email } })
      .then((data) => {
        setUserID(data.data[0].user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [globalUser]);

  return (
    <Router>
      <Auth0ProviderWithHistory>
        <Switch>
          <Route path="/user">
            {' '}
            <AccountPage globalUser={globalUser} />
            {' '}
          </Route>
          <Route path="/createUser" component={UserSignUp} />
          <Route exact path="/">
            <App globalUser={globalUser} setGlobalUser={setGlobalUser} />
            {' '}
          </Route>
          <Route path="/birdList">
            <BirdList userID={userID} home={returnToAccountPage} />
          </Route>
          <Route path="/friendsList">
            <FriendsList userID={userID} allUsers={allUsers} home={returnToAccountPage} />
          </Route>
        </Switch>
      </Auth0ProviderWithHistory>
    </Router>
  );
};

// create the root of the app by selection where the app should be mounted in the dom
ReactDOM.createRoot(document.getElementById('root')).render(
  <MainComponent />,
);
