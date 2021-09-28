const newsService = require('./news_service')
const mongoose = require('mongoose')
const newsDto = require('./model/news_dto')
const ApiError = require('../../errors/ApiError')
const newsController = {
   
    addNews: async (req, res, next) => {
        try {
            const {cookies} = req
            const {uid} = cookies
            if(!uid) return next(ApiError.badRequest('uid is required'))
            const news = {
                ...req.body,
                userId : uid
            }
            const returnedNews = await newsService.addNews(news)
            return res.status(200).json(newsDto(returnedNews))
        } catch (err) {
            next(err)
        }
    },
    getNews: async(req, res, next) => {
        const queryLength = Object.keys(req.query).length
        console.log(queryLength)
        switch (queryLength) {
            case 1:
                let param = Object.keys(req.query)[0]
                let value = req.query[param]
                if (param === 'placeId') value = mongoose.Types.ObjectId(value)
                try {
                    const property = {}
                    property[param] = value
                    const news = await newsService.getNewsBy(property)
                    return res.status(200).json(news.map(news => newsDto(news)))
                } catch (err) {
                    return next(err)
                }
            case 0:
                try {
                    const news = await newsService.getNews()
                    return res.status(200).json(news.map(news => newsDto(news)))
                } catch (err) {
                   return next(err)
                }
            default:
                return next(ApiError.badRequest('Invalid request'))

        }

    },
    deleteNews: async(req, res, next) => {
        try{
            await newsService.deleteNews()
            return res.sendStatus(200)
        } catch(err){
            return next(err)
        }
    }
}

module.exports = newsController