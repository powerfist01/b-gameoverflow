const NewsService = require('../services/news');

module.exports = {
    getAllNews: async (req, res, next) => {
        try {
            let newsService = new NewsService();
            let news = await newsService.getAllNews(req.body);

            res.send({success: true, message: 'Latest news for you!', data: news});
        } catch (err) {

        }
    },
    getNewsById: async (req, res, next) => {
        console.log(req.body);

        res.send("lol-1")
    },
    getNewsByTag: async (req, res, next) => {
        console.log(req.body);

        res.send("lol-1")
    },
    insertLatestNews: async (req, res, next) => {
        try{
            let newsService = new NewsService();
            await newsService.insertLatestNews(req.body);

            res.send({success: true, message: 'Latest news added!'})
        } catch (err){
            res.send({success: true, message: 'Error occured!'})
        }
    },
    updateNews: async (req, res, next) => {
        console.log(req);

        res.send("lol-2")
    }
}