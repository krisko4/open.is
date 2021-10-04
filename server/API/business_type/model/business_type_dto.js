const businessTypeDto = (businessType) => {
    const businessTypeCopy = {...businessType._doc}
    return businessTypeCopy['name']
}

module.exports = businessTypeDto