const {format} = require('date-fns')

const newsDto = (news) => {
    return {
        title: news.title,
        date: format(news.date, 'yyyy-MM-dd HH:mm:ss'),
        content: news.content
    }
}

module.exports= newsDto