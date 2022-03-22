import myAxios from '../axios/axios';

export const addNewVisit = (placeId: string) =>
  myAxios.post('/visits', {
    date: new Date(),
    placeId: placeId,
  });
