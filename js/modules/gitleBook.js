/**
 * Created with JetBrains WebStorm.
 * User: oddgeir
 * Date: 8/13/13
 * Time: 8:05 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('gitleBook', ['firebase'], function($routeProvider) {

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
