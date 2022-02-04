import myAxios from "../axios/axios";

export const removeSubscription = (id: string) => myAxios.delete(`/users/${localStorage.getItem('uid')}/subscriptions/${id}`)

export const addSubscription = (id: string) =>
    myAxios.patch(`/users/${localStorage.getItem('uid')}/subscriptions`, {
        locationId: id
    })