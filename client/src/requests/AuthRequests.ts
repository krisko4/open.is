import myAxios from '../axios/axios';
import { LoginInputs } from '../components/Auth/Login/LoginForm';
import { RegistrationInputs } from '../components/Auth/Registration/RegistrationForm';

export const confirmRegistrationToken = (token: string) => myAxios.get(`/confirmation/${token}`);

export const login = (loginData: LoginInputs) => myAxios.post('auth/login', { ...loginData });

export const signOut = () => myAxios.get('auth/logout');

export const signUp = (userData: RegistrationInputs) => myAxios.post('/registration', { ...userData });

export const auth = () => myAxios.get('/auth');

export const confirmEmailChange = (email: string, token: string) => myAxios.get(`/confirmation/${email}/${token}`);

export const resendConfirmationEmail = (email: string) =>
  myAxios.post('/registration/resend-email', {
    email: email,
  });
