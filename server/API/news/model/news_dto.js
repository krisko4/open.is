
const newsDto = (news) => {
    return {
        title: news.title,
        date: news.date,
        content: news.content
    }
}

module.exports= newsDto