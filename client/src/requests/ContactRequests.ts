import myAxios from '../axios/axios';

export interface ContactFormValues {
  name: string;
  email: string;
  content: string;
}

export const sendContactMessage = (values: ContactFormValues) =>
  myAxios.post('/contact', {
    ...values,
    date: new Date(),
  });
