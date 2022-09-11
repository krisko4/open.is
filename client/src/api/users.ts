import myAxios from '../axios/axios';

interface UserData {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export const updateUserData = (uid: string, userData: UserData) => myAxios.patch(`/users/${uid}`, userData);

export const updateProfilePicture = (uid: string, formData: FormData) =>
  myAxios.patch(`/users/${uid}/profile-picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const removeProfilePicture = (uid: string) => myAxios.delete(`/users/${uid}/profile-picture`);
