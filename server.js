var express = require('express');
var path = require('path');
var exphbs = require("express-handlebars");
var mongojs = require('mongojs');
var axios = require('axios');
var cheerio = require('cheerio');

PORT = process.env.PORT || 3000;

var app = express();

// app('views', path.join(__dirname, 'views'));
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs( 
    {defaultLayout: 'main'}
));
app.set('view engine', 'handlebars');

// testing home route for handlebars
app.get('/', (req, res) => {
    res.render('home');
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'));


app.listen(PORT, function() {
    console.log('App running on port ' + PORT + '!');
  });