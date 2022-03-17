import myAxios from '../axios/axios';

export const addNews = (title: string, content: string, locationId: string) =>
  myAxios.post('/news', {
    title: title,
    content: content,
    locationId: locationId,
  });