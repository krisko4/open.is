
const userValidator =  {

    validateName: (name) => {
        const regExp = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/
        return regExp.test(name)
    },
    validatePassword: (password) => {
        const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
        return regExp.test(password)
    },
    validateEmail: (email) => {
        const regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        return regExp.test(email)
    }

}

module.exports = userValidator




