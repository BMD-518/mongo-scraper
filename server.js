require('dotenv').config()
var express = require('express');
var path = require('path');
var exphbs = require("express-handlebars");
var axios = require('axios');
var cheerio = require('cheerio');
var mongoose = require('mongoose');

PORT = process.env.PORT || 3000;

var db = require('./models');

var app = express();

// // Set variable for routes file
// var externalRoutes = require('./routes/route666')

// Set views path
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs( 
    {defaultLayout: 'main'}
));
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'));

// Set express to use external routes
// app.use('/externalRoutes', externalRoutes);

// var MONGO_URI = process.env.mLab_URI || 'mongodb://localhost/scraper_db';
var MONGO_URI = 'mongodb://localhost/scraper_db';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => console.log('DB Connected!'))
.catch(err => console.log(err));

// testing home route for handlebars
app.get('/', (req, res) => {
    res.render('home');
});




app.listen(PORT, function() {
    console.log('App running on port ' + PORT + '!');
  });