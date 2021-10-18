const userDto = (user) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }
}

module.exports = userDto