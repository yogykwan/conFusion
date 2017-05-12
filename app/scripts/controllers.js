'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;


        $scope.dishes = menuFactory.getDishes();

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
    }])

    .controller('ContactController', ['$scope', function ($scope) {

        $scope.feedback = {
            mychannel: "", firstName: "", lastName: "", agree: false, email: ""
        };
        var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope', function ($scope) {
        $scope.sendFeedback = function () {

            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

    .controller('DishDetailController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.orderText = '';

        $scope.dish = menuFactory.getDish(3);

    }])

    .controller('DishCommentController', ['$scope', function ($scope) {

        //Step 1: Create a JavaScript object to hold the comment from the form
        $scope.dishComment = {
            author: "", rating: 5, comment: "", date: ""
        };

        $scope.submitComment = function () {

            $scope.dishComment.date = new Date().toISOString();

            $scope.dish.comments.push($scope.dishComment);

            $scope.dishCommentForm.$setPristine();
            $scope.dishComment = {author: "", rating: 5, comment: "", date: ""};

        }
    }])

;
