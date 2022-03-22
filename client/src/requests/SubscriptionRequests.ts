import myAxios from '../axios/axios';

export const removeSubscription = (id: string) =>
  myAxios.delete(`/users/${localStorage.getItem('uid')}/subscriptions/${id}`);

export const subscribeToPlace = (id: string) =>
  myAxios.patch(`/users/${localStorage.getItem('uid')}/subscriptions`, {
    locationId: id,
  });
