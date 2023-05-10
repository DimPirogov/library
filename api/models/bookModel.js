module.exports = class book {
  constructor(bookId, genreId, title, author, year, amount) {
    this.bookId = bookId;
    this.genreId = genreId;
    this.title = title;
    this.author = author;
    this.year = year;
    this.amount = amount;
  }
}
