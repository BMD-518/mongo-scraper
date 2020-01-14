var mongoose = require('mongoose');

// Schema constructor variable
var Schema = mongoose.Schema;

// create new schema object using constructor
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: true
    },

    // Note references note schema, associating notes with articles
    note: {
        type: Schema.Types.ObjectId,
        ref:'Note'
    }
});


// Create Article model with mongoose.model() method.
var Article = mongoose.model('Article', ArticleSchema);

// Export Article model
module.exports = Article;