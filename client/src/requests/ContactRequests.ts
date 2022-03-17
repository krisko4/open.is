import myAxios from '../axios/axios';
import { initialValues } from '../components/HomePage/Contact/ContactForm';

export const sendContactMessage = (values : typeof initialValues) =>
  myAxios.post('/contact',
    {
      ...values,
      date: new Date(),
    });