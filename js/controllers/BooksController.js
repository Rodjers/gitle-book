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
            book.loaners = [];
            var test = {Name: 'Oddgeir'};
            book.loaners.push(test);

            $scope.books.add(book);
            $('#bookAddedModal').modal('show');
            document.getElementById('registerBookForm').reset();
        }
        else {
            alert(book['isbn'] + " is not a valid ISBN!");
        }

    };
    $scope.delBook = function(bookIndex){
        if (confirm("Are you sure?")){
            $scope.books.remove($scope.books[bookIndex]);
        }

    };

    $scope.editBookFn = function(book, index){

        $scope.books[index].title = book.title;
        $scope.books[index].author = book.author;
        $scope.books[index].genre = book.genre;
        $scope.books[index].rating = book.rating;
        $scope.books[index].price = book.price;

    };
    $scope.editBookModal = function(index){
        $scope.index = index;
        $scope.editBook = {};
        $scope.editBook.title = $scope.books[index].title;
        $scope.editBook.author = $scope.books[index].author;
        $scope.editBook.genre = $scope.books[index].genre;
        $scope.editBook.rating = $scope.books[index].rating;
        $scope.editBook.price = $scope.books[index].price;

        $('#editBookModal').modal("show");
    };

    $scope.borrowBook = function(name, index){
        var duplicate = false;
        var loaner;
        $scope.alertshow = false;
        $scope.borrowerName = name;

        for (var i in $scope.books[index].loaners){
            loaner = $scope.books[index].loaners[i];
            if (loaner.Name == name){

                duplicate = true;
            }
        }

        if (duplicate){
            $scope.alertshow = true;
        }
        else {
            loaner = {Name: name};
            var book = $scope.books[index];
            if (book.loaners == null){
                book.loaners = [];
                book.loaners.push(loaner);
                $scope.books.update(book);
                alert('First Book loaned');
            }
            else {
                book.loaners.push(loaner);
                $scope.books.update(book);
                alert('Book loaned');
            }
            $('#borrowBookModal').modal('hide');
        }

    };
    $scope.borrowBookModal= function(index){
        $scope.alertshow = false;
        $scope.index = index;
        $('#borrowBookModal').modal("show");
    };


}
