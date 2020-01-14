var mongoose = require('mongoose');

// Create variable referencing Schema constructor
var Schema = mongoose.Schema;


// Create new object using schema constructor 
var NoteSchema = new Schema({
    title: String,
    body: String
});

// Create note model using mongoose model method.
var Note = mongoose.model('Note', NoteSchema);

// Export note model
module.exports = Note;