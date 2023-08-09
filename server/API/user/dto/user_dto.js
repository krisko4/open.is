const userDto = (user) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        img: user.img !== '' && `${process.env.CLOUDI_URL}/${user.img}`,
        birthdate: user.birthdate
    }
}

module.exports = userDto