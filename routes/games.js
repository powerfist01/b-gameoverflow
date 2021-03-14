module.exports = function(express){
  const gamesService = require('../sevices/games');
  const router = express.Router();
  
  router.get('/', gamesService.getAllGames);

  router.get('/:gameId', gamesService.getGameById);

  router.post('/addAGame', gamesService.addGame);

  return router;
}