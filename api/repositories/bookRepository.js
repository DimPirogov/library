const bookModel = require('../models/bookModel');
const db_context = require('../db_context');

async function getAllBooks() {
  let books = [];
  let data =  await db_context.selectAllBooks()

  data.forEach(book => {
    books.push(new bookModel(book.book_id, book.genre_id, book.title,
      book.author, book.year, book.amount))
  });

  return books;
};

async function addBook(title, author, year, genre, amount) {
  db_context.insertBook(title, author, year, genre, amount);
};

async function deleteBook(bookId) {
  db_context.deleteBook(bookId);
};

async function getBook(bookId) {
  let data = db_context.getBook(bookId);
  return data;
};

async function editBook(bookId, title, author, year, genre, amount){
  db_context.updateBook(bookId, title, author, year, genre, amount);
}

async function getTitle(str) {
  let books = [];
  let data = await db_context.selectBooksByTitle(str);
  data.forEach(book => {
    books.push(new bookModel(book.book_id, book.genre_id, book.title,
      book.author, book.year, book.amount))
  });
  return books;
}

async function getAuthor(str) {
  let books = [];
  let data = await db_context.selectBooksByAuthor(str);
  data.forEach(book => {
    books.push(new bookModel(book.book_id, book.genre_id, book.title,
      book.author, book.year, book.amount))
  });
  return books;
}

module.exports = {
  getAllBooks,
  addBook,
  deleteBook,
  getBook,
  editBook,
  getTitle,
  getAuthor
}
