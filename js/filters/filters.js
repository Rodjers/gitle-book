gitleBook.filter('isbnAvareFilter', function() {
    return function(input, string) {
         var books = [];
    angular.forEach(input, function(value, key){
        if(string == undefined){
            this.push(value);
        }
        else if(isValidISBN(string) && value.isbn == string){
            this.push(value);
        }
        else if(value.title.indexOf(string) !== -1 ||
            value.author.indexOf(string) !== -1 ||
            value.genre.indexOf(string) !== -1 ||
            value.rating == string ||
            String(value.price).indexOf(string)  !== -1  ) {

            this.push(value);
        }
    }, books);
    return books;
    };
});
