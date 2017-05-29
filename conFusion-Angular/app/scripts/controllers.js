'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', function ($scope, menuFactory, favoriteFactory) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";

        menuFactory.query(
            function (response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.select = function (setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };

        $scope.toggleFavorites = function () {
            $scope.showFavorites = !$scope.showFavorites;
        };

        $scope.addToFavorites = function (dishid) {
            favoriteFactory.save({_id: dishid});
            $scope.showFavorites = !$scope.showFavorites;
        };
    }])

    .controller('ContactController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {
        $scope.feedback = {
            mychannel: "",
            firstname: "",
            lastname: "",
            agree: false,
            email: "",
            areacode: "",
            number: ""
        };
        var channels = [{value: "tel", label: "Tel."}, {value: "email", label: "Email"}];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

        $scope.sendFeedback = function () {
            if ($scope.feedback.agree && $scope.feedback.mychannel == "") {
                $scope.invalidChannelSelection = true;
            } else {
                $scope.invalidChannelSelection = false;
                feedbackFactory.save($scope.feedback);
                $scope.feedback = {
                    mychannel: "",
                    firstname: "",
                    lastname: "",
                    agree: false,
                    email: "",
                    areacode: "",
                    number: ""
                };
                $scope.feedbackForm.$setPristine();
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$state', '$stateParams', 'menuFactory', 'commentFactory', function ($scope, $state, $stateParams, menuFactory, commentFactory) {
        $scope.dish = {};
        $scope.orderText = '';
        $scope.showDish = false;
        $scope.message = "Loading ...";

        menuFactory.get({
            id: $stateParams.id
        })
            .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.dishComment = {rating: 5, comment: ""};

        $scope.submitComment = function () {
            commentFactory.save({id: $stateParams.id}, $scope.dishComment);
            $state.go($state.current, {}, {reload: true});
            $scope.dishCommentForm.$setPristine();
            $scope.dishComment = {rating: 5, comment: ""};
        };
    }])

    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', 'promotionFactory', function ($scope, menuFactory, corporateFactory, promotionFactory) {
        $scope.showDish = false;
        $scope.showPromotion = false;
        $scope.showLeader = false;
        $scope.message = "Loading ...";

        menuFactory.query({
            featured: "true"
        })
            .$promise.then(
            function (response) {
                var dishes = response;
                $scope.dish = dishes[0];
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        promotionFactory.query({
            featured: "true"
        })
            .$promise.then(
            function (response) {
                var promotions = response;
                $scope.promotion = promotions[0];
                $scope.showPromotion = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        corporateFactory.query({
            featured: "true"
        })
            .$promise.then(
            function (response) {
                var leaders = response;
                $scope.leader = leaders[0];
                $scope.showLeader = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
        $scope.leaders = corporateFactory.query();
    }])

    .controller('FavoriteController', ['$scope', '$state', 'favoriteFactory', function ($scope, $state, favoriteFactory) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showDelete = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";

        favoriteFactory.query(
            function (response) {
                $scope.dishes = response.dishes;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        $scope.select = function (setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            } else if (setTab === 3) {
                $scope.filtText = "mains";
            } else if (setTab === 4) {
                $scope.filtText = "dessert";
            } else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };

        $scope.toggleDelete = function () {
            $scope.showDelete = !$scope.showDelete;
        };

        $scope.deleteFavorite = function (dishid) {
            favoriteFactory.delete({id: dishid});
            $scope.showDelete = !$scope.showDelete;
            $state.go($state.current, {}, {reload: true});
        };
    }])
;
