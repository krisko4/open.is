import myAxios from 'axios/axios';

export const getPaginatedEvents = async (fetchUrl: string, start: number, limit: number) => {
  return myAxios.get(fetchUrl, {
    params: {
      start: start,
      limit: limit,
    },
  });
};
