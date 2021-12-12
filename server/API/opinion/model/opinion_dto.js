const userDto = require("../../user/model/user_dto")
const {format} = require('date-fns')
const opinionDto = (opinion) => {
    if(!opinion) return 
    const user = userDto(opinion.author)
    return {
        date: format(opinion.date, 'yyyy-MM-dd HH:mm:ss'),
        note: opinion.note,
        content: opinion.content,
        author: `${user.firstName} ${user.lastName}`,
        authorImg: user.img
        
    }
}

module.exports = opinionDto