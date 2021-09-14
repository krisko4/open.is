
const placeDto = (place, user) => {
    const placeDto = {...place._doc}
    delete placeDto['userId']
    if(placeDto['openingHours']) {
        const copy = {...placeDto['openingHours']}
        const openingHours = copy._doc
        delete openingHours['_id']
        placeDto['openingHours'] = openingHours
    }
     user ? placeDto['isUserOwner'] = true : placeDto['isUserOwner'] = false
    return placeDto
}

module.exports = placeDto