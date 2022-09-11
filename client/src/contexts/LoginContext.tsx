import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { auth } from '../api/auth';

export const LoginContext = createContext<LoginContextData | null>(null);

export interface UserData {
  email: string;
  fullName: string;
  img: string | File | ArrayBuffer | null;
  isLoggedIn: boolean;
}

const clearUserData: UserData = {
  email: '',
  fullName: '',
  img: '',
  isLoggedIn: false,
};

const useProviderData = () => {
  const [userData, setUserData] = useState(clearUserData);

  return {
    userData,
    setUserData,
  };
};

export const LoginContextProvider: FC = ({ children }) => {
  const state = useProviderData();
  const [isAuthFinished, setAuthFinished] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      try {
        await auth();
        const data = {
          isLoggedIn: true,
          email: localStorage.getItem('email') || '',
          fullName: localStorage.getItem('fullName') || '',
          img: localStorage.getItem('img') || '',
        };
        state.setUserData(data);
      } catch (err) {
        if (state.userData.isLoggedIn) {
          localStorage.removeItem('uid');
          localStorage.removeItem('fullName');
          localStorage.removeItem('email');
          localStorage.removeItem('img');
        }
      } finally {
        setAuthFinished(true);
      }
    };
    authenticate();
  }, []);

  return <>{isAuthFinished && <LoginContext.Provider value={state}>{children}</LoginContext.Provider>}</>;
};

type LoginContextData = ReturnType<typeof useProviderData>;

export const useLoginContext = () => {
  const loginContext = useContext(LoginContext);
  if (!loginContext) throw new Error('LoginContext should be used inside LoginContextProvider');
  return loginContext;
};
