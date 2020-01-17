require('dotenv').config()
// var axios = require('axios');
// var cheerio = require('cheerio');
var mongoose = require('mongoose');

var MONGO_URI = process.env.mLab_URI || 'mongodb://localhost/scraper_db';

// Establish MongoDB connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => console.log('DB Connected!'))
.catch((err) => console.log(err));

var db = require('../models');

module.exports = function (app, axios, cheerio) {
    
    app.get('/', (req, res) => {
        db.Article.find()
    })
}

// module.exports = (function() {
//     'use strict';

//     var externalRoutes = require('express').Router();

//     return externalRoutes;
// })();

