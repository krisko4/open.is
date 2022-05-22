import myAxios from '../axios/axios';

export const setNotificationToken = (notificationToken: string) =>
  myAxios.patch(`/users/${localStorage.getItem('uid')}`, {
    notificationToken,
  });
