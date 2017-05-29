'use strict';

angular.module('confusionApp')
    .constant("baseURL", "https://localhost:3443/")

    .factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "dishes/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    }])

    .factory('commentFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "dishes/:id/comments/:commentId", {id: "@Id", commentId: "@CommentId"}, {
            'update': {
                method: 'PUT'
            }
        });
    }])

    .factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "promotions/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    }])

    .factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "leadership/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    }])

    .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "feedback/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    }])

    .factory('favoriteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "favorites/:id", null, {
            'update': {
                method: 'PUT'
            },
            'query': {method: 'GET', isArray: false}
        });
    }])
;