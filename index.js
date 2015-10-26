var express = require('express');
var bodyParser = require('body-parser');
var browserify = require('browserify');
var userRouter = require('./lib/userRouter');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/node_modules/bootstrap/dist/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts'));
app.use('/users', userRouter);

app.get('/main.js', function (req, res) {
    res.set('Content-Type', 'text/javascript');
    browserify()
        .transform(require('browserify-css'))
        .add('./public/index.js')
        .bundle()
        .pipe(res);
});

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});