import myAxios from '../axios/axios';

export const getBusinessTypes = () =>
  myAxios.get('/business_types');