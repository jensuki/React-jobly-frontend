import React, { useState, useEffect } from 'react'; // usestate for setting current user
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';
import Navbar from './Navbar';
import JoblyApi from './api';
import { UserProvider } from './UserContext'; // context for sharing data across components
import './App.css';

function App() {
  // state for logged in user + token
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // effect to fetch user data when 'token' changes
  useEffect(() => {
    async function fetchUserData() {
      if (token) {
        try {
          JoblyApi.token = token; // set token globally in api helper
          const username = localStorage.getItem('username'); // get username from localstorage
          const user = await JoblyApi.request(`users/${username}`) // fetch current user
          setCurrentUser(user); // store user data in state
        }
        catch (err) {
          console.error('Error fetching user data', err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null); // clear user data if no token
      }
      setLoading(false);
    }
    fetchUserData();
  }, [token]) // rerun when token changes

  // login function to authenticate user (passed down as props)
  async function login({ username, password }) {
    try {
      // make API call to authenticate user
      const response = await JoblyApi.request('auth/token', { username, password }, 'post'); // authenticate user
      const token = response.token // extract token from response
      JoblyApi.token = token // save token globally for future requests
      setToken(token); // save token in state
      localStorage.setItem('token', token); // save token to localStorage
      localStorage.setItem('username', username); // save username to localstorage

      // fetch users profile info
      const user = await JoblyApi.request(`users/${username}`);
      setCurrentUser(user); // save user data in state
    }
    catch (err) {
      console.error('Login Failed', err)
      throw new Error('Invalid login credentials')
    }
  }

  // logout function to clear users session
  async function logout() {
    setCurrentUser(null);
    setToken(null);
    JoblyApi.token = null;
    localStorage.removeItem('token'); // clear token from localStorage
    localStorage.removeItem('username');
  }

  // signup function to register a new user
  async function signup(formData) {
    try {
      const response = await JoblyApi.request('auth/register', formData, 'post'); // register user
      const token = response.token // extract token from response
      JoblyApi.token = token; //save token globally
      setToken(token); // update state
      localStorage.setItem('token', token); // store token and username in localstorage for persistence
      localStorage.setItem('username', formData.username)

      // fetch usrs profile using username from formdata
      const user = await JoblyApi.request(`users/${formData.username}`);
      setCurrentUser(user);
    }
    catch (err) {
      console.error('Signup failed:', err);
      throw new Error(err.message || 'Signup Failed. Please try again.')
    }
  }

  return (
    <div className="App">
      {/* provider user data + auth functions to the rest of comopnents */}
      <UserProvider value={{ currentUser, setCurrentUser, token, login, logout, signup, loading }}>
        <BrowserRouter>
          <Navbar currentUser={currentUser} logout={logout} />
          {/* pass login and signup to routes */}
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
