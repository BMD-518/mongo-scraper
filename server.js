require('dotenv').config();
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');

var exphbs = require("express-handlebars");
var path = require('path');

var axios = require('axios');
var cheerio = require('cheerio');

PORT = process.env.PORT || 3000;

var db = require('./models');

var app = express();

// // Set variable for routes file
// var externalRoutes = require('./routes/route666')

// Set views path
// app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', exphbs(
//     { defaultLayout: 'main' }
// ));
// app.set('view engine', 'handlebars');

app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main",
      partialsDir: [
        //  path to your partials
        path.join(__dirname, 'views/partials'),
      ]
    })
  );
app.set("view engine", "handlebars");
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'));

// Set express to use external routes
// app.use('/externalRoutes', externalRoutes);

var MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/scraper_db';
// var MONGO_URI = 'mongodb://localhost/scraper_db';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected!'))
    .catch(err => console.log(err));

// testing home route for handlebars
app.get('/', function(req, res) {
    db.Article.find({}).limit(2).then( function(article) {
        console.log(article);
        res.render('index', { articles: article })
    }).catch(function(err) {
        console.log(err);
    });
});

app.get('/scrape', function(req, res) {
    axios.get('https://www.huffpost.com/news/politics').then( function(response)  {
        var $ = cheerio.load(response.data);
        console.log(res);

        // target each element with class of "card__text"
        $('.card__text').each( function(i, element) {

            
            // target text from all .card__headlines elements for title
            var title = $(element).children('.card__headlines').text();
            
            // target text from all .card__description elements for summary
            var summary = $(element).children('.card__description').text();
            
            // target href of .card__headline from child a tag
            var link = $(element).children('.card__headlines').children('a').attr('href');
            
            var saved = false;
            
            // empty results object
            var result = {
                title: title,
                summary: summary,
                link: link,
                saved: saved
            };

            

            // console.log(result);

            // Create new Articles from each result
            db.Article.create(result).then((dbArticle) => {
                console.log(dbArticle);
            }).catch(err => console.log(err));
            
        });
        // redirect to home route after scraping
        res.redirect('/');
    });
});








app.listen(PORT, function () {
    console.log('App running on port ' + PORT + '!');
});