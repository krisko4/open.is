import myAxios from '../axios/axios';

export type CodeDetails = {
  value: string;
};

export const getCodeByValueAndLocationId = (value: string, locationId: string) =>
  myAxios.get('/referrals', {
    params: {
      codeValue: value,
      locationId,
    },
  });
