const News = require('./model/news')
const mongoose = require('mongoose')
const placeService = require('../place/place_service')
const ApiError = require('../../errors/ApiError')


const newsService = {
    addNews : async (news) => {
        let {userId} = news
        const place = await placeService.findByLocationId(news.locationId)
        if(!place) throw ApiError.internal('Invalid location id.')
       
        if(place.userId != userId) throw ApiError.internal('Invalid uid.')
        return new News({
            _id: new mongoose.Types.ObjectId,
            title: news.title,
            date: new Date(),
            content: news.content,
            locationId: news.locationId
        }).save()
   
    },

    getNewsBy: (property) => News.find(property).sort({date: -1}).exec(),
    getNews: () => News.find().exec(),
    deleteNews: () => News.deleteMany().exec(),
    deleteNewsByPlaceId: (placeId) => News.deleteMany({placeId: placeId}).exec()
}

module.exports = newsService