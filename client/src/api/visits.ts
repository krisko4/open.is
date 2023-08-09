import myAxios from '../axios/axios';

export const addNewVisit = (locationId: string) =>
  myAxios.post('/visits', {
    locationId: locationId,
  });
