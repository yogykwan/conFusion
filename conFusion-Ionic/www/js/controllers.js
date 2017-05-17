'use strict';

angular.module('conFusion.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };


    $scope.reservation = {};

    // Create the reserve modal that we will use later
    $ionicModal.fromTemplateUrl('templates/reserve.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.reserveForm = modal;
    });

    // Triggered in the reserve modal to close it
    $scope.closeReserve = function () {
      $scope.reserveForm.hide();
    };

    // Open the reserve modal
    $scope.reserve = function () {
      $scope.reserveForm.show();
    };

    // Perform the reserve action when the user submits the reserve form
    $scope.doReserve = function () {
      console.log('Doing reservation', $scope.reservation);

      // Simulate a reservation delay. Remove this and replace with your reservation
      // code if using a server system
      $timeout(function () {
        $scope.closeReserve();
      }, 1000);
    };

  })

  .controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', 'baseURL',
    '$ionicListDelegate', function ($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate) {

      $scope.baseURL = baseURL;
      $scope.tab = 1;
      $scope.filtText = '';
      $scope.showDetails = false;

      $scope.showMenu = false;
      $scope.message = "Loading ...";

      $scope.dishes = menuFactory.query(
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

      $scope.addFavorite = function (index) {
        console.log("index is " + index);
        favoriteFactory.addToFavorites(index);
        $ionicListDelegate.closeOptionButtons();
      };

    }])

  .controller('ContactController', ['$scope', function ($scope) {

    $scope.feedback = {
      mychannel: "", firstName: "", lastName: "", agree: false, email: ""
    };
    var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

  }])

  .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {
    $scope.sendFeedback = function () {

      console.log($scope.feedback);

      if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
        $scope.invalidChannelSelection = true;
        console.log('incorrect');
      }
      else {
        feedbackFactory.save($scope.feedback);

        $scope.invalidChannelSelection = false;
        $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};
        $scope.feedback.mychannel = "";
        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }
    };
  }])

  .controller('DishDetailController', ['$scope', '$stateParams', 'dish', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicModal', '$ionicPopover', function ($scope, $stateParams, dish, menuFactory, favoriteFactory, baseURL, $ionicModal, $ionicPopover) {

    $scope.baseURL = baseURL;
    $scope.orderText = '';

    $scope.dish = dish;

    $ionicPopover.fromTemplateUrl('templates/dishdetailpopover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function ($event) {
      $scope.popover.show($event);
    };
    $scope.closePopover = function () {
      $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function () {
      // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function () {
      // Execute action
    });

    $scope.addFavorite = function () {
      favoriteFactory.addToFavorites(parseInt($stateParams.id, 10));
      $scope.popover.hide();
    };


    $ionicModal.fromTemplateUrl('templates/dishcomment.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.commentForm = modal;
    });

    $scope.closeCommentForm = function () {
      $scope.commentForm.hide();
      $scope.popover.hide();
    };

    $scope.showCommentForm = function () {
      $scope.commentForm.show();
    };

    $scope.dishComment = {
      author: "", rating: 5, comment: "", date: ""
    };

    $scope.submitComment = function () {

      $scope.dishComment.date = new Date().toISOString();

      $scope.dish.comments.push($scope.dishComment);
      menuFactory.update({id: $scope.dish.id}, $scope.dish);

      $scope.closeCommentForm();

      $scope.dishComment = {author: "", rating: 5, comment: "", date: ""};
    };

  }])


  .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', 'promotionFactory', 'baseURL', function ($scope, menuFactory, corporateFactory, promotionFactory, baseURL) {

    $scope.baseURL = baseURL;
    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.dish = menuFactory.get({id: 0})
      .$promise.then(
        function (response) {
          $scope.dish = response;
          $scope.showDish = true;
        },
        function (response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

    $scope.promotion = promotionFactory.get({id: 0});

    $scope.leader = corporateFactory.get({id: 0});

  }])

  .controller('AboutController', ['$scope', 'corporateFactory', 'baseURL', function ($scope, corporateFactory, baseURL) {

    $scope.baseURL = baseURL;

    $scope.leaders = corporateFactory.query();
  }])

  .controller('FavoritesController', ['$scope', 'dishes', 'favorites', 'favoriteFactory', 'baseURL', '$ionicPopup', '$ionicLoading', '$timeout', function ($scope, dishes, favorites, favoriteFactory, baseURL, $ionicPopup, $ionicLoading, $timeout) {
    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;

    $scope.favorites = favorites;
    $scope.dishes = dishes;

    $scope.toggleDelete = function () {
      $scope.shouldShowDelete = !$scope.shouldShowDelete;
    };

    $scope.deleteFavorite = function (index) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirm Delete',
        template: 'Are you sure you want to delete this item?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          console.log('Ok to delete');
          favoriteFactory.deleteFromFavorites(index);
        } else {
          console.log('Canceled delete');
        }
      });
      $scope.shouldShowDelete = false;
    };

  }])

;
