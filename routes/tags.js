module.exports = function(express){
  const tagController = require('../controllers/tags');
  const router = express.Router();
  
  router.get('/getAllTags', tagController.getAllTags);

  router.get('/:tagId', tagController.getTagById);

  return router;
}