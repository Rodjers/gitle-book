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

    $scope.registerBook = function(book){

        if(isValidISBN(book['isbn'])){
            $scope.books.add(book);
            $('#bookAddedModal').modal('show');
            document.getElementById('registerBookForm').reset();
        }
        else {
            alert(book['isbn'] + " is not a valid ISBN!");
        }

    }
    $scope.delBook = function(bookIndex){
        if (confirm("Are you sure?")){
            $scope.books.remove($scope.books[bookIndex]);
        }

    }

    $scope.editBook = function(index){
        if (confirm("Are you sure?")){
            $scope.books.update(book);
        }



}
}
