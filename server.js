var express = require('express');
var path = require('path');
var exphbs = require("express-handlebars");
var axios = require('axios');
var cheerio = require('cheerio');

require('./routes/route666')(axios, cheerio, app);

PORT = process.env.PORT || 3000;

var app = express();

// Set variable for routes file
var externalRoutes = require('./routes/route666')

// Set views path
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
// Set express to use external routes
// app.use('/externalRoutes', externalRoutes);



app.listen(PORT, function() {
    console.log('App running on port ' + PORT + '!');
  });