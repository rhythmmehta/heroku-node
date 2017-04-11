var express = require('express');
var http = require("http");
var parser = require('xml2json');
const util = require('util')

var app = express();
var cors = require('cors');
app.use(cors());


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

var router = express.Router();

// route with parameters (http://localhost:8080/hello/:name)
router.get('/api/search', function(req, res) {
    var address = req.param('address');
    var citystatezip = req.param('citystatezip');
    var api_key='X1-ZWz199n5edun0r_32ywy';
    var result={};

       var url= 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id='+api_key+'&address='+address+'&citystatezip='+citystatezip;

       var gsaReq = http.get(url, function (response) {
           var completeResponse = '';
           response.on('data', function (chunk) {
               completeResponse += chunk;
           });
           response.on('end', function() {
                var json = parser.toJson(completeResponse);
                var body = JSON.parse(json);

                if(body['SearchResults:searchresults'].response) {
                    result={
                        response:body['SearchResults:searchresults'].response.results.result
                    }
                } else {
                    result={
                        message:body['SearchResults:searchresults'].message
                    }
                }
                res.send(result);
           })
       }).on('error', function (e) {
           console.log('problem with request: ' + e.message);
       });


});

// apply the routes to our application
app.use('/', router);
