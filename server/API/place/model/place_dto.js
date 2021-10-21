
const placeDto = (place, uid) => {
    const placeDto = {...place}
    delete placeDto['userId']
    delete placeDto['createdAt']
    if(placeDto['openingHours']) {
        const copy = {...placeDto['openingHours']}
        const openingHours = copy._doc
        delete openingHours['_id']
        placeDto['openingHours'] = openingHours
    }
    placeDto['img'] = `${process.env.CLOUDI_URL}/${placeDto['img']}`
    uid && place.userId == uid ? placeDto['isUserOwner'] = true : placeDto['isUserOwner'] = false
    return placeDto
}

module.exports = placeDto