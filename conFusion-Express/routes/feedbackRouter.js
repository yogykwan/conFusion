var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Feedback = require('../models/feedback');
var Verify = require('./verify');

var feedbackRouter = express.Router();
feedbackRouter.use(bodyParser.json());

feedbackRouter.route('/')
    .get(function (req, res, next) {
        Feedback.find({}, function (err, feedback) {
            if (err) return next(err);
            res.json(feedback);
        });
    })

    .post(function (req, res) {
        Feedback.create(req.body, function (err, feedback) {
            if (err) return next(err);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the feedback with id: ' + feedback._id);
        });
    });

module.exports = feedbackRouter;