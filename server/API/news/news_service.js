const News = require('./model/news')
const mongoose = require('mongoose')
const placeService = require('../place/place_service')


const newsService = {
    addNews : async (news) => {
        let {userId} = news
        const place = await placeService.getPlaceById(news.placeId)
        if(!place) throw new Error('Invalid placeId.')
        if(place.userId != userId) throw new Error('Invalid uid.')
        console.log(place._id)
        return new News({
            _id: new mongoose.Types.ObjectId,
            title: news.title,
            date: new Date(),
            content: news.content,
            placeId: place._id
        }).save()
   
    },

    getNewsBy: (property) => News.find(property).sort({date: -1}).exec(),
    getNews: () => News.find().exec(),
    deleteNews: () => News.deleteMany().exec()
}

module.exports = newsService