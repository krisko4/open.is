import { FC } from 'react';
import { Login } from './Login/Login';
import { EmailConfirmation } from './Registration/EmailConfirmation';
import { Registration } from './Registration/Registration';

export const Auth: FC = () => {
  return (
    <div>
      <Login />
      <Registration />
      <EmailConfirmation />
    </div>
  );
};
