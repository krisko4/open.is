import myAxios from '../axios/axios';

export const setNotificationToken = (notificationToken: string) => {
  if (localStorage.getItem('uid')) {
    return myAxios.patch(`/users/${localStorage.getItem('uid')}`, {
      notificationToken,
    });
  }
};
