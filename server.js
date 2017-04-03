var express             = require('express'); //Express JS framework
var app                 = express(); //Invoke express to variable for use in the application
var port                = process.env.PORT || 3000;
var morgan              = require('morgan'); //Import morgan package
var mongoose            = require('mongoose'); //HTTP request logger middleware for Node.js
var bodyParser          = require('body-parser');
var router              = express.Router();
var selftempRoutes      = require('./app/routes/selftemplates')(router);
var selfheadRoutes      = require('./app/routes/selfheaders')(router);
var othertempRoutes     = require('./app/routes/othertemplates')(router);
var otherheadRoutes     = require('./app/routes/otherheaders')(router);
var usersRoutes         = require('./app/routes/users')(router);
var mongojs             = require('mongojs');
var db                  = mongojs('evaluatory',['selftemplates']);
var path                = require('path'); //Input path module

app.use(morgan('dev')); //Morgan middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));

app.use('/api', selftempRoutes);  // Assign name to end points (e.g., '/api/management/', '/api/users' ,etc. 
app.use('/api', selfheadRoutes);
app.use('/api', othertempRoutes);
app.use('/api', otherheadRoutes);
app.use('/api', usersRoutes);

// <------- Currently Local ------->
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/evaluatory', function(err) {
    if (err) {
        console.log('Not connected to the database: ' + err);
    } else {
        console.log('Succesfully connected to MongDB');
    }
});

// ---------TEST MONGOJS-----------
app.get('/selftemps', function(req, res) {
    console.log('GET');
    db.selftemplates.find(function(err, data){
        console.log(data);
        res.json(data);
    })
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html')); // Set index.html as layout
});

app.listen(port, function() {
    console.log('Server is running on port ' + port); // Listen on configured port
});
