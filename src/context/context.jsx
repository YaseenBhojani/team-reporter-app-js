import { createContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getDatabase, set, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBcT0kEM1pycWqI9htDfx23lco73n7sl0A',
  authDomain: 'team-reporter-app-javascript.firebaseapp.com',
  databaseURL:
    'https://team-reporter-app-javascript-default-rtdb.firebaseio.com',
  projectId: 'team-reporter-app-javascript',
  storageBucket: 'team-reporter-app-javascript.appspot.com',
  messagingSenderId: '1003770540734',
  appId: '1:1003770540734:web:7fd931c75a5e95d5b4e4ef',
};

const firbaseApp = initializeApp(firebaseConfig);
export const firbaseAuth = getAuth(firbaseApp);
export const database = getDatabase(firbaseApp);

export const ContextProvider = createContext({
  isLoggedIn: false,
  login: () => { },
  logout: () => { },
  isVisible: false,
  setIsVisible: null,
  newTeam: null,
  setNewTeam: null,
  loadingSpinnerIsVisible: false,
  setLoadingSpinnerIsVisible: null,
  signUpUserWithEmailAndPassword: null,
  signInUserWithEmailAndPassword: null,
  putData: null,
  teamId: null,
  setTeamId: null,
});

const Context = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newTeam, setNewTeam] = useState(0);
  const [loadingSpinnerIsVisible, setLoadingSpinnerIsVisible] = useState(false);
  const [teamId, setTeamId] = useState(null);

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    signOut(firbaseAuth);
  };

  const signUpUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firbaseAuth, email, password);
  };

  const signInUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firbaseAuth, email, password);
  };

  const putData = (key, data) => set(ref(database, key), data);

  const contextValue = {
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    isVisible,
    setIsVisible,
    newTeam,
    setNewTeam,
    loadingSpinnerIsVisible,
    setLoadingSpinnerIsVisible,
    signUpUserWithEmailAndPassword,
    signInUserWithEmailAndPassword,
    putData,
    teamId,
    setTeamId,
  };

  return (
    <ContextProvider.Provider value={contextValue}>
      {props.children}
    </ContextProvider.Provider>
  );
};

export default Context;
