module.exports = function(express){
  const tagController = require('./tagsController');
  const router = express.Router();
  
  router.get('/getAllTags', tagController.getAllTags);

  router.get('/:tagId', tagController.getTagById);

  return router;
}