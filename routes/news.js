module.exports = function (express, passport) {
    const newsController = require('../controllers/news');
    const router = express.Router();

    router.get('/', newsController.getAllNews);

    router.get('/:id', newsController.getNewsById);

    // router.get('/tags/:tag', newsController.getNewsByTag);

    router.post('/insertLatestNews', passport.authenticate('jwt', { session: false }), newsController.insertLatestNews);

    // router.post('/updateNews', passport.authenticate('jwt', { session: false }), newsController.updateNews);

    return router;
}