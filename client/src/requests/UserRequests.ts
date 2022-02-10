import myAxios from "../axios/axios";

export const updateUserData = (uid: string, formData: FormData) => myAxios.patch(`/users/${uid}}`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export const updateProfilePicture = (uid: string, formData: FormData) => myAxios.patch(`/users/${uid}/profile-picture`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export const removeProfilePicture = (uid: string) => myAxios.delete(`/users/${uid}/profile-picture`)