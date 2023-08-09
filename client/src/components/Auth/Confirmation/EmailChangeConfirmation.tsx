import { confirmEmailChange } from 'api/auth';
import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useCustomSnackbar } from 'utils/snackbars';

export const EmailChangeConfirmation: FC = () => {
  const { email, token } = useParams();
  const navigate = useNavigate();
  const { enqueueSuccessSnackbar, enqueueWarningSnackbar, enqueueErrorSnackbar } = useCustomSnackbar();

  useEffect(() => {
    confirmEmailChange(email as string, token as string)
      .then(() => {
        enqueueSuccessSnackbar('You have successfully changed your e-mail address.');
      })
      .catch((err) => {
        if (err.response.data === 'Provided token has expired.') {
          enqueueWarningSnackbar('Your activation token has expired. Please try to change your e-mail again.');
          return;
        }
        enqueueErrorSnackbar();
      })
      .finally(() => {
        navigate('/');
      });
  }, []);

  return null;
};
