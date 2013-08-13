/**
 * Created with JetBrains WebStorm.
 * User: oddgeir
 * Date: 8/13/13
 * Time: 8:24 AM
 * To change this template use File | Settings | File Templates.
 */
function BooksController($scope, angularFireCollection) {
    var url = 'https://gitlebook.firebaseio.com/books/';
    $scope.books = angularFireCollection(url);

}
