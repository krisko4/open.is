const userDto = (user) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        img: `${process.env.CLOUDI_URL}/${user.img}`
    }
}

module.exports = userDto