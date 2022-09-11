import { emailReducer, setEmail } from "./emailSlice";

const initialState = {
    email: ''
}

test('Should return the initial state', () => {
    expect(emailReducer(undefined, {type: ''})).toEqual(initialState)
})


test('Should set email', () => {
    const email = 'test@mail.com';
    expect(emailReducer(initialState, setEmail(email))).toEqual({
        email: email
    })
})