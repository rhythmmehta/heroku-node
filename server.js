var connString = 'postgres://atfgwsdzxlfpxs:d7a12e3fbfdcab0d7bcf4f5d06bbc4071f941ef72c2da336de19093c5ffc2040@ec2-184-73-189-221.compute-1.amazonaws.com:5432/d73qvnddija9l5';

var pg = require('pg');
var express = require('express');
var http = require("http");
var parser = require('xml2json');
const util = require('util');


var app = express();
var cors = require('cors');
app.use(cors());
app.use(express.logger());



var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {

    res.render('index');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

var router = express.Router();

router.get('/api/users', function(req, res, next) {
  pg.connect(connString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM users', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

router.post('/api/users', function(req, res, next) {
  pg.connect(connString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('INSERT INTO users(email, apples, oranges, mixed, result) VALUES($1,$2,$3,$4,$5)' [req.body.email, req.body.apples, req.body.oranges,req.body.mixed,req.body.result], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});



app.use('/', router);
