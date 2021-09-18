
const placeDto = (place, uid) => {
    const placeDto = {...place._doc}
    delete placeDto['userId']
    delete placeDto['createdAt']
    if(placeDto['openingHours']) {
        const copy = {...placeDto['openingHours']}
        const openingHours = copy._doc
        delete openingHours['_id']
        placeDto['openingHours'] = openingHours
    }
    console.log(place.userId)
    console.log(uid)
    uid && place.userId == uid ? placeDto['isUserOwner'] = true : placeDto['isUserOwner'] = false
    return placeDto
}

module.exports = placeDto