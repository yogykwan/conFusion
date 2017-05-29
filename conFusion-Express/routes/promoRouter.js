var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promotions = require('../models/promotions');
var Verify = require('./verify');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get(function (req, res, next) {
        Promotions.find(req.query, function (err, promotion) {
            if (err) return next(err);
            res.json(promotion);
        });
    })

    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Promotions.create(req.body, function (err, promotion) {
            if (err) return next(err);
            console.log('Promotion created!');
            var id = promotion._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the promotion with id: ' + id);
        });
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Promotions.remove({}, function (err, resp) {
            if (err) return next(err);
            res.json(resp);
        });
    });

promoRouter.route('/:promotionId')
    .get(function (req, res, next) {
        Promotions.findById(req.params.promotionId, function (err, promotion) {
            if (err) return next(err);
            res.json(promotion);
        });
    })

    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Promotions.findByIdAndUpdate(req.params.promotionId, {
            $set: req.body
        }, {
            new: true
        }, function (err, promotion) {
            if (err) return next(err);
            res.json(promotion);
        });
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Promotions.findByIdAndRemove(req.params.promotionId, function (err, resp) {
            if (err) return next(err);
            res.json(resp);
        });
    });

module.exports = promoRouter;