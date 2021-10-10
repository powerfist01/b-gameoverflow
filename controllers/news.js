const NewsService = require('../services/news');

module.exports = {
    getAllNews: async (req, res, next) => {
        try {
            let newsService = new NewsService();
            let news = await newsService.getAllNews();

            res.send({success: true, message: 'Latest news for you!', data: news});
        } catch (err) {
            res.send({success: false, message: 'Error occured!'})
        }
    },
    getNewsById: async (req, res, next) => {
        try{
            console.log(req.params);
            let id = req.params.id;
            let newsService = new NewsService();
            let news = await newsService.getNewsById(id);

            res.send({success: true, message: 'Have a great news!', data: news});
        } catch (err){
            res.send({success: false, message: 'Error occured!'})
        }
    },
    getNewsByTag: async (req, res, next) => {
        // Next Iteration
    },
    insertLatestNews: async (req, res, next) => {
        try{
            let newsService = new NewsService();
            await newsService.insertLatestNews(req.body);

            res.send({success: true, message: 'Latest news added!'})
        } catch (err){
            res.send({success: false, message: 'Error occured!'})
        }
    },
    updateNews: async (req, res, next) => {
        // Next Iteration
    }
}