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

    .controller('DishDetailController', ['$scope', '$state', '$stateParams', 'menuFactory', 'commentFactory', 'AuthFactory', function ($scope, $state, $stateParams, menuFactory, commentFactory, AuthFactory) {
        $scope.dish = {};
        $scope.orderText = '';
        $scope.showDish = false;
        $scope.message = "Loading ...";

        $scope.loggedIn = AuthFactory.isAuthenticated();

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


    .controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {
        $scope.loggedIn = false;
        $scope.username = '';

        if (AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.username = AuthFactory.getUsername();
        }

        $scope.openLogin = function () {
            ngDialog.open({
                template: 'views/login.html',
                scope: $scope,
                className: 'ngdialog-theme-default',
                controller: "LoginController"
            });
        };

        $scope.logOut = function () {
            AuthFactory.logout();
            $scope.loggedIn = false;
            $scope.username = '';
        };

        $rootScope.$on('login:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
        });

        $rootScope.$on('registration:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
        });

        $scope.stateis = function (curstate) {
            return $state.is(curstate);
        };
    }])

    .controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
        $scope.loginData = $localStorage.getObject('userinfo', '{}');

        $scope.doLogin = function () {
            if ($scope.rememberMe) {
                $localStorage.storeObject('userinfo', $scope.loginData);
            }
            AuthFactory.login($scope.loginData);
            ngDialog.close();
        };

        $scope.openRegister = function () {
            ngDialog.open({
                template: 'views/register.html',
                scope: $scope,
                className: 'ngdialog-theme-default',
                controller: "RegisterController"
            });
        };
    }])

    .controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
        $scope.register = {};
        $scope.loginData = {};

        $scope.doRegister = function () {
            AuthFactory.register($scope.registration);
            ngDialog.close();
        };
    }])
;
