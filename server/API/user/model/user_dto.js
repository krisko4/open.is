const userDto = (user) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName
    }
}

module.exports = userDto