const userDto = require("../../user/model/user_dto")

const opinionDto = (opinion) => {
    const user = userDto(opinion.author)
    return {
        date: opinion.date,
        note: opinion.note,
        content: opinion.content,
        author: `${user.firstName} ${user.lastName}`,
        
    }
}

module.exports = opinionDto