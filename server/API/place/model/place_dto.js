
const placeDto = (place, uid) => {
    const placeDto = { ...place }
    console.log(placeDto)
    delete placeDto['userId']
    delete placeDto['createdAt']
    placeDto.locations.forEach(location => {
        if (location.openingHours) {
            const copy = { ...location.openingHours }
            const openingHours = copy._doc
            delete openingHours['_id']
            location['openingHours'] = openingHours
        }
    })
    placeDto['img'] = `${process.env.CLOUDI_URL}/${placeDto['img']}`
    uid && place.userId == uid ? placeDto['isUserOwner'] = true : placeDto['isUserOwner'] = false
    return placeDto
}

module.exports = placeDto