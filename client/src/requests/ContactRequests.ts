import { initialValues } from 'views/HomePage/Contact/ContactForm';
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
