var express = require('express');
var app = express();
var browserify = require('browserify');
var userStore = require('./lib/userStore');

app.use(express.static(__dirname + '/public'));

app.get('/data', function (req, res, next) {
    var limit = req.param('limit') || 20;
    var skip = req.param('skip') || 0;
    var order = req.param('order');
    var term = req.param('term');
    userStore.list(term, limit, skip, order, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
});

app.get('/main.js', function (req, res) {
    res.set('Content-Type', 'text/javascript');
    browserify()
        .add('./public/index.js')
        .bundle()
        .pipe(res);
});

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});