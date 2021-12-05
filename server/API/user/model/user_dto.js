const userDto = (user) => {
    console.log(user.img)
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        img: user.img !== '' && `${process.env.CLOUDI_URL}/${user.img}`
    }
}

module.exports = userDto