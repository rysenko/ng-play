var express = require('express');
var router = express.Router();
var userStore = require('./userStore');

router.get('/', function (req, res, next) {
    var limit = req.query.limit || 20;
    var skip = req.query.skip || 0;
    var order = req.query.order;
    var term = req.query.term;
    userStore.list(term, limit, skip, order, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
});

router.post('/', function (req, res, next) {
    if (!req.body) {
        return res.status(400).send('Payload must be JSON');
    }
    userStore.update(req.body, function (err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
});

router.delete('/', function (req, res, next) {
    if (!req.body) {
        return res.status(400).send('Payload must be JSON');
    }
    userStore.delete(req.body, function (err) {
        if (err) {
            return next(err);
        }
        res.send('Ok');
    });
});

module.exports = router;