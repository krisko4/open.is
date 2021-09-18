const visitDto = (visit) => {
    const visitDto = {...visit._doc}
    delete visitDto['_id']
    return visitDto
}

module.exports = visitDto