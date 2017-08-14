var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var fs = require('fs');
var ejs = require('ejs');
var engine = require('ejs-mate');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('express-flash');
var cors = require('cors');


var secret = require('./config/secret');


mongoose.Promise = global.Promise;

mongoose.connect(secret.database, function(err) {
    if (err) {
        console.log("cannot connect to the database");
    } else {
        console.log("connected to the database");
    }

});


var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//app.use(morgan('dev'));
// app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey,
    store: new MongoStore({ url: secret.database, autoReconnect: true })
}));
app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
app.use(morgan('dev'));
app.use(cors());

var globalRoute = require('./routes/global.route');
var bussinessRoute = require('./routes/business.route');


app.use(globalRoute);
app.use('/business', bussinessRoute);

app.listen(secret.port);