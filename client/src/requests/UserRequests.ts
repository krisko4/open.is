import myAxios from "../axios/axios";

export const updateUserData = (uid : string, formData : FormData) => myAxios.patch(`/users/${uid}}`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})