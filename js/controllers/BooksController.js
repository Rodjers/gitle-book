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
            alert("Book added!");
            document.getElementById('registerBookForm').reset();
        }
        else {
            alert(book['isbn'] + " is not a valid ISBN!");
        }

    }
    $scope.delBook = function(bookIndex){
        alert("Are you sure?");
        $scope.books.remove($scope.books[bookIndex]);
    }

}
function isValidISBN(isbn){
    isbn = isbn.replace(/\-/g,'');
    isbn = isbn.replace(/\+/g,'');
    alert(isbn);
    var digits = isbn.split('');
    var sum = 0;

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
        alert(sum + 'test');
        return ((sum % 11) == 0);

    }else

//    return ((sum % 11) == 0);
    return false;
}
