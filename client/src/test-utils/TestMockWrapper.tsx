import { AuthContext } from 'contexts/AuthContext';
import { LoginContext, UserData } from 'contexts/LoginContext';
import { SnackbarProvider } from 'notistack';
import { FC, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'store';

const useMockedLoginProviderValue = (isLoggedIn: boolean) => {
  const value: UserData = {
    email: '',
    fullName: '',
    img: '',
    isLoggedIn: isLoggedIn,
  };
  const [userData, setUserData] = useState(value);
  return {
    userData,
    setUserData,
  };
};

interface AuthContextProps {
  regOpen?: boolean;
  logOpen?: boolean;
  confOpen?: boolean;
  mail?: string;
}

const useMockedAuthProviderValue = ({ regOpen, logOpen, confOpen, mail }: AuthContextProps) => {
  const [registrationOpen, setRegistrationOpen] = useState(regOpen || false);
  const [loginOpen, setLoginOpen] = useState(logOpen || false);
  const [confirmationOpen, setConfirmationOpen] = useState(confOpen || false);
  const [email, setEmail] = useState(mail || '');

  return {
    confirmationOpen,
    setConfirmationOpen,
    loginOpen,
    setLoginOpen,
    registrationOpen,
    setRegistrationOpen,
    email,
    setEmail,
  };
};

interface LoginContextProps {
  isLoggedIn: boolean;
}

export const TestMockWrapper: FC<LoginContextProps & AuthContextProps> = ({
  isLoggedIn,
  regOpen,
  logOpen,
  confOpen,
  mail,
  children,
}) => {
  const loginState = useMockedLoginProviderValue(isLoggedIn);
  const authState = useMockedAuthProviderValue({ regOpen, logOpen, confOpen, mail });
  return (
    <StoreProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
      >
        <BrowserRouter>
          <LoginContext.Provider value={loginState}>
            <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
          </LoginContext.Provider>
        </BrowserRouter>
      </SnackbarProvider>
    </StoreProvider>
  );
};
