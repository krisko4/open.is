
const placeDto = (place, uid) => {
    const placeDto =  place._doc ? convertDoc({...place._doc}) : convertPlaceData(place)
    placeDto['img'] = `${process.env.CLOUDI_URL}/${placeDto['img']}`
    uid && place.userId == uid ? placeDto['isUserOwner'] = true : placeDto['isUserOwner'] = false
    return placeDto
}

const convertPlaceData = (placeData) => {
    const placeDto = { ...placeData}
    delete placeDto['userId']
    delete placeDto['createdAt']
    placeDto.locations.forEach(location => {
        if (location.openingHours) {
            delete location.openingHours['_id']
        }
    })
    return placeDto


} 

const convertDoc = (placeDoc) => {
    const placeDto = { ...placeDoc}
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
    return placeDto

}

module.exports = placeDto