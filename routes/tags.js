module.exports = function(express){
  const tagService = require('../services/tags');
  const router = express.Router();
  
  router.get('/getAllTags', tagService.getAllTags);

  router.get('/:tagId', tagService.getTagById);

  return router;
}