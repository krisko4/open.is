import { initialValues } from 'views/homePage/contact/components/Form';
import myAxios from '../axios/axios';

export interface ContactFormValues {
  name: string;
  email: string;
  content: string;
}

export const sendContactMessage = (values: typeof initialValues) =>
  myAxios.post('/contact', {
    ...values,
    date: new Date(),
  });
