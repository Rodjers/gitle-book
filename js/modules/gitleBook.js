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
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if (isValidISBN(viewValue)) {
                        scope.isbn = true;
//                        ctrl.$setValidity('isbn', true);
//                    return parseFloat(viewValue.replace(',', '.'));
                        return viewValue
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
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (FLOAT_REGEXP.test(viewValue)) {
                    ctrl.$setValidity('price', true);
                    return parseFloat(viewValue.replace(',', '.'));
                } else {
                    ctrl.$setValidity('price', false);
                    return undefined;
                }
            });
        }
    };
});

gitleBook.directive('starRating', function() {


    return {
        restrict: 'E',
        replace: true,
        scope: {rating:'@rating'},
        template: '<div>' +
                    '<span class="glyphicon glyphicon-star-empty"></span>' +
                    '<span class="glyphicon glyphicon-star-empty"></span>' +
                    '<span class="glyphicon glyphicon-star-empty"></span>' +
                    '<span class="glyphicon glyphicon-star-empty"></span>' +
                    '<span class="glyphicon glyphicon-star-empty"></span>' +
                '</div>',
        link: function(scope, element, attrs){
            scope.$watch('rating', function(newValue, oldValue){
                for(var i = 0; i < 5; i++ ){
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




//            for(var i in angular.element(element.children())){
//                alert(i);
//                i.addClass('glyphicon glyphicon-star')
//            }


        }
    };
});

    function isValidISBN(isbn){
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
