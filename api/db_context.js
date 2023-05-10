const pgp = require('pg-promise')(/*options */);
const db = pgp('postgres://postgres:password@localhost:5433/library');

async function selectAllBooks() {
  let data = await db.many("SELECT * FROM books");
  return data;
};

async function insertBook(title, author, year, genre, amount) {
  await db.none(`INSERT INTO books (genre_Id, title, author, year, amount)` +
                `VALUES (${genre},'${title}','${author}',${year},${amount})`);
}

async function deleteBook(bookId) {
  await db.none(`DELETE FROM books WHERE book_Id = ${bookId}`);
}

async function getBook(bookId) {
  let data = await db.one(`SELECT * FROM books WHERE book_Id = ${bookId}`);
  return data;
};

async function updateBook(bookId, title, author, year, genre, amount) {
  await db.none(`UPDATE books SET title = '${title}', author = '${author}',
                year = ${year}, genre_Id = ${genre}, amount = ${amount} WHERE book_Id = ${bookId}`);
}

async function selectBooksByTitle(str) {
  let data = await db.any(`SELECT * FROM books WHERE title LIKE '${str}%'`);
  return data;
}

async function selectBooksByAuthor(str) {
  let data = await db.any(`SELECT * FROM books WHERE author LIKE '${str}%'`);
  return data;
}

module.exports = {
  selectAllBooks,
  insertBook,
  deleteBook,
  getBook,
  updateBook,
  selectBooksByTitle,
  selectBooksByAuthor
}
