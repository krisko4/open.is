interface userData{
    firstName: string,
    lastName: string,
    email: string,
    img: string
}

export const setUserData = (userData: userData) => {
    return {
        type: 'SET_USER_DATA',
        payload: userData
    }
}