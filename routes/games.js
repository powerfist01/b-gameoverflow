module.exports = function(express){
  const gamesController = require('../controllers/games');
  const router = express.Router();
  
  router.get('/', gamesController.getAllGames);

  router.get('/:gameId', gamesController.getGameById);

  router.post('/addAGame', gamesController.addGame);

  return router;
}