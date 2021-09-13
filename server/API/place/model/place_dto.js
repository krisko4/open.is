
const placeDto = (place, user) => {
    const placeDto = {...place._doc}
    delete placeDto['userId']
    user ? placeDto['isUserOwner'] = true : placeDto['isUserOwner'] = false
    return placeDto
}

module.exports = placeDto