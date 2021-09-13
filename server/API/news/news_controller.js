const newsService = require('./news_service')
const mongoose = require('mongoose')
const newsDto = require('./model/news_dto')

const newsController = {
    addNews: async (req, res) => {
        try {
            const {cookies} = req
            const {uid} = cookies
            if(!uid) return res.status(400).json('uid not found in cookies.')
            const news = {
                ...req.body,
                userId : uid
            }
            const newPlace = await newsService.addNews(news)
            return res.status(200).json(newPlace)
        } catch (err) {
            console.log(err)
            return res.status(400).json(err)
        }
    },
    getNews: async(req, res) => {
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
                    console.log(err)
                    return res.status(400).json({ error: err })
                }
            case 0:
                try {
                    const news = await newsService.getNews()
                    return res.status(200).json(news)
                } catch (err) {
                    console.log(err)
                    return res.status(400).json(err)
                }
            default:
                return res.status(400).json({
                    error: 'Invalid request'
                })

        }

    },
    deleteNews: async(req, res) => {
        try{
            await newsService.deleteNews()
            return res.sendStatus(200)
        } catch(err){
            console.log(err)
            return res.sendStatus(500)
        }
    }
}

module.exports = newsController