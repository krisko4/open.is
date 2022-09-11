import myAxios from '../axios/axios';

type Opinion = {
  authorId: string;
  locationId: string;
  content: string;
  note: number;
};

export const addOpinion = (opinion: Opinion) => myAxios.post('/opinions', opinion);
