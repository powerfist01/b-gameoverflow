const Tag = require('./Tag');

class TagService {
    size = 36;
    constructor() {

    }
    async getAllTags() {
        try {
            let tags = await Tag.find().limit(this.size);
            return { success: true, result: tags };
        } catch (err) {
            console.log('Error in getting all tags')
            return { success: false, error: err, result: 'Error occured!' };
        }
    }

    async addNewTags(tags, questionId) {
        try {
            for(let i=0; i<tags.length; i++){
                let addedQuestion = await this.addQuestionIdInTag(tags[i], questionId);
            }
            return { success: true, result: tags };
        } catch (err) {
            console.log('Error in creating tags')
            return { success: false, error: err, result: 'Error occured!' };
        }
    }

    async addQuestionIdInTag(tag, questionId) {
        // creating a new tag if not exists, if exists push the question id
        try {
            let update = { $push: { questions: questionId }, updatedAt: Date.now() };
            let options = { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false };
            let newTag = await Tag.findOneAndUpdate({ name: tag }, update, options);
            return { success: true, result: newTag };
        } catch (err) {
            console.log('Error occured in inserting question in tags array');
            return { success: false, error: err, result: 'Error occured!' };
        }
    }

    async deleteTag() {

    }
}

module.exports = TagService;