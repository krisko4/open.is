export const setEmail = (email : string) => {
    console.log('hello ' + email)
    return {
        type: 'SET_EMAIL',
        payload: email
    }
}