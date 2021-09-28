const {format} = require('date-fns')

const visitDto = (visit) => {
    const visitDto = {...visit._doc}
    visitDto['date'] = format(visitDto['date'], 'yyyy-MM-dd HH:mm:ss')
    delete visitDto['_id']
    return visitDto
}

module.exports = visitDto