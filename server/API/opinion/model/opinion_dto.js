const userDto = require("../../user/model/user_dto")
const { format, isToday } = require('date-fns')

const opinionDto = (opinions) => {
    if (opinions.length === 0) return []
    const opinionsToday = opinions.filter(opinion => isToday(new Date(opinion.date))).length
    return {
        today: opinionsToday,
        opinions: opinions.map(opinion => {
            const user = userDto(opinion.author)
            return {
                date: format(opinion.date, 'yyyy-MM-dd HH:mm:ss'),
                note: opinion.note,
                content: opinion.content,
                author: `${user.firstName} ${user.lastName}`,
                authorImg: user.img
            }
        })
    }
}

const allOpinionsDto = (opinionData) => {
    const today = opinionData[0].today[0].today
    const total = opinionData[0].total[0].total
    const opinionsArray = opinionData[0].data
    for (const opinionObj of opinionsArray) {
        for (const opinion of opinionObj.opinions) {
            opinion.date = format(opinion.date, 'yyyy-MM-dd HH:mm:ss')
        }
    }
    return {
        total: total,
        today: today,
        locations: opinionsArray
    }
}

module.exports = {opinionDto, allOpinionsDto}