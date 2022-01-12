const News = require('./News')

class NewsService {
    constructor() {

    }
    async getAllNews() {
        try {
            let res = await News.find({}).sort({ createdAt: -1 });
            return res;
        } catch (err) {
            return { success: false, error: err, result: 'Error occured!' };
        }
    }
    async getNewsById(id) {
        try {
            let res = await News.findById(id);
            return res;
        } catch (err) {
            return { success: false, error: err, result: 'Error occured!' };
        }
    }
    async insertLatestNews(newsObject) {
        try {
            let { heading, subHeading, tags, body, author, timeToRead, image, imageDescription } = newsObject;
            tags = this.getTagsArray(tags);

            let newNews = new News({
                heading: heading, 
                subHeading: subHeading, 
                tags: tags,
                body: body,
                author: author,
                timeToRead: timeToRead, 
                image: image, 
                imageDescription: imageDescription
            });
            let savedNews = await newNews.save();
            return { success: true, result: savedNews };

        } catch (err) {
            console.log('Error occured', err)
            return { success: false, error: err, result: 'Error occured!' };
        }
    }

    getTagsArray(tags) {
        try {
            let tagsArr = tags.split(',');
            tagsArr = tagsArr.map(function (tag) {
                return tag.trim();
            })

            return tagsArr;
        } catch (err) {
            return []
        }
    }

    async updateNews(questionNumber) {

        try {

        } catch (err) {

        }

    }
}

module.exports = NewsService;
