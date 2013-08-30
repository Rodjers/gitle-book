/**
 * Created with JetBrains WebStorm.
 * User: oddgeir
 * Date: 8/13/13
 * Time: 8:05 PM
 * To change this template use File | Settings | File Templates.
 */
var gitleBook = angular.module('gitleBook', ['firebase'], function($routeProvider)
{

    $routeProvider
        .when('/register',
        {
            controller: 'BooksController',
            templateUrl: 'Partials/RegisterEbook.html'
        })
        .when('/browse',
        {
            controller: 'BooksController',
            templateUrl: 'Partials/BrowseBooks.html'
        })
        .otherwise({ redirectTo:'/register'});
});

gitleBook.directive('validIsbn', function() {
    return {
        link: function(scope, elm, attrs, ctrl) {
            scope.$watch('book.isbn', function(newValue, oldValue) {
                if (isValidISBN(newValue)) {
                    scope.isbn = true;
//                        ctrl.$setValidity('isbn', true);
//                    return parseFloat(viewValue.replace(',', '.'));
                    return newValue
                } else {
                    scope.isbn = false;
//                        ctrl.$setValidity('isbn', false);
                    return undefined;
                }
            });
        }
    };
});

gitleBook.directive('searchIsbn', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (isValidISBN(viewValue)) {
                    ctrl.$setValidity('isbn', true);
//                    return parseFloat(viewValue.replace(',', '.'));
                    return viewValue
                } else {
                    ctrl.$setValidity('isbn', false);
                    return undefined;
                }
            });
        }
    };
});

var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d{1,2})?$/;
gitleBook.directive('validPrice', function() {
    return {
        link: function(scope, elm, attrs, ctrl) {
            scope.$watch('book.price', function(newValue, oldValue) {
                if (FLOAT_REGEXP.test(newValue)) {
//                    ctrl.$setValidity('price', true);
                    scope.price = true;
                    return parseFloat(newValue.replace(',', '.'));
                } else {
//                    ctrl.$setValidity('price', false);
                    scope.price = false;
                    return undefined;
                }
            });
        }
    };
});

gitleBook.directive('starRatingInput', function() {


    return {
        restrict: 'E',
        replace: true,
        template: '<div class="star-rating">' +
            '</div>',

        compile: function(tElement, tAttr){
            var numberOfStars = 8;
            if(tAttr.numberofstars != undefined){
                numberOfStars = tAttr.numberofstars;
            }
            var child = '<span class="glyphicon glyphicon-star-empty"></span>';
            for(var n = 0; n < numberOfStars; n++){
                var m = numberOfStars - n;
                angular.element(tElement).append(child);
                angular.element(tElement.children()[n]).attr('ng-click', tAttr.model + ' = ' + m);
            }

            return function(scope, element, attrs){

                scope.validRating = false;

                scope.$watch(attrs.model, function(newValue, oldValue){

                    for(var i = (numberOfStars - 1); i > -1; i-- ){
                        if(i > (numberOfStars - 1 - newValue)){
                            scope.validRating = true;
                            angular.element(element.children()[i]).removeClass('glyphicon-star-empty');
                            angular.element(element.children()[i]).addClass('glyphicon-star');
                        }
                        else {
                            angular.element(element.children()[i]).removeClass('glyphicon-star');
                            angular.element(element.children()[i]).addClass('glyphicon-star-empty');
                        }
                    }
                });
            }
        }
    };
});

function setBookRating(rating){

}

gitleBook.directive('starRating', function() {


    return {
        restrict: 'E',
        replace: true,
        scope: {rating: '@rating'},
        template: '<div>' +
//                    '<span class="glyphicon glyphicon-star-empty"></span>' +
//                    '<span class="glyphicon glyphicon-star-empty"></span>' +
//                    '<span class="glyphicon glyphicon-star-empty"></span>' +
//                    '<span class="glyphicon glyphicon-star-empty"></span>' +
//                    '<span class="glyphicon glyphicon-star-empty"></span>' +
                '</div>',
        compile: function (tElement, tAttr){

            var numberOfStars = 6;
            if(tAttr.numberofstars != undefined){
                numberOfStars = tAttr.numberofstars;
            }
            var child = '<span class="glyphicon glyphicon-star-empty"></span>';
            for(var n = 0; n < numberOfStars; n++){
                var m = numberOfStars - n;
                angular.element(tElement).append(child);
            }

            return function(scope, element, attrs){
                scope.$watch('rating', function(newValue, oldValue){
                    for(var i = 0; i < numberOfStars; i++ ){
                        if(i < newValue){

                            angular.element(element.children()[i]).removeClass('glyphicon-star-empty');
                            angular.element(element.children()[i]).addClass('glyphicon-star');
                        }
                        else {
                            angular.element(element.children()[i]).removeClass('glyphicon-star');
                            angular.element(element.children()[i]).addClass('glyphicon-star-empty');
                        }
                    }
                });
            }
        }
    };
});

    function isValidISBN(isbn){
        if(isbn == undefined){
            return false;
        }
        isbn = isbn.replace(/\-/g,'');
        isbn = isbn.replace(/\+/g,'');

        var digits = isbn.split('');
        var sum = 0;
        var i = 0;

        if (isbn.length == 13 && /^\d+$/.test(isbn) ){
            for (i = 0; i < 13; i += 2){
                sum += +parseInt(digits[i]);
            }
            for (i = 1; i < 12; i += 2){
                sum += (3 * +parseInt(digits[i]));
            }
            return sum % 10 === 0;
        }
        else if (isbn.length == 10){
            for (i = 0; i < digits.length; i++){
                sum += ((10-i) * parseInt(digits[i]));
            }
            return ((sum % 11) == 0);

        }else

//    return ((sum % 11) == 0);
            return false;
    }

    function formatPrice(price){
        if(price.indexOf('.') == -1){
            return price.concat('.00');
        }
        else if(price.indexOf('.') > 0 && price.indexOf('.') == (price.length - 2)){
            return price.concat('0');
        }
    }


