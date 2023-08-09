const subscriberDto = (user) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthdate: user.birthdate,
        
    }
}

module.exports = userDto