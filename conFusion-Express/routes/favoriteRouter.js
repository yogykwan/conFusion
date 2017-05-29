var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .get(function (req, res, next) {
        Favorites.findOne({customer: req.decoded._id})
            .populate(['customer', 'dishes'])
            .exec(function (err, favorite) {
                if (err) return next(err);
                res.json(favorite);
            });
    })

    .post(Verify.verifyOrdinaryUser, function (req, res) {
        Favorites.findOne({customer: req.decoded._id}, function (err, favorite) {
            if (!favorite) {
                favorite = new Favorites({
                    customer: req.decoded._id
                });
            }
            if (favorite.dishes.indexOf(req.body._id) === -1) {
                favorite.dishes.push(req.body);
            }
            favorite.save(function (err, favorite) {
                if (err) return next(err);
                res.json(favorite);
            });
        });
    })

    .delete(Verify.verifyOrdinaryUser, function (req, res) {
        Favorites.findOne({customer: req.decoded._id}, function (err, favorite) {
            if (err) return next(err);
            if (favorite) {
                Favorites.findByIdAndRemove(favorite._id, function (err, resp) {
                    if (err) return next(err);
                    res.json(resp);
                });
            }
        });
    });

favoriteRouter.route('/:favoriteId')
    .delete(Verify.verifyOrdinaryUser, function (req, res) {
        Favorites.findOne({customer: req.decoded._id}, function (err, favorite) {
            if (err) return next(err);
            favorite.dishes = favorite.dishes.filter(function (dish) {
                return dish != req.params.favoriteId;   // typeof(dish)=object, typeof(id)=string
            });

            if (favorite.dishes.length > 0) {
                favorite.save(function (err, resp) {
                    if (err) return next(err);
                    res.json(resp);
                });
            } else {
                Favorites.findByIdAndRemove(favorite._id, function (err, resp) {
                    if (err) return next(err);
                    res.json(resp);
                });
            }
        });
    });

module.exports = favoriteRouter;