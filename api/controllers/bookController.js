const { getAllBooks, addBook, deleteBook, getBook, editBook, getTitle, getAuthor } = require('../repositories/bookRepository')

async function get(req, res) {
  let data = await getAllBooks();
  return res.json(data);
};

async function add(req, res) {
  await addBook(req.body.title, req.body.author, req.body.year,
                req.body.genre, req.body.amount);
  res.sendStatus(200);
};

async function remove(req, res) {
  await deleteBook(req.body.bookId);
};

async function getOneBook(req, res) {
  let data = await getBook(req.params.id);
  return res.json(data);
};

async function edit(req, res) {
  await editBook(req.body.bookId, req.body.title, req.body.author,
                req.body.year, req.body.genre, req.body.amount);
  res.sendStatus(200);
}

async function searchAuthor(req, res) {
  let data = await getAuthor(req.query.str);
  return res.json(data);
}

async function searchTitle(req, res) {
  let data = await getTitle(req.query.str);
  return res.json(data);
}

module.exports = {
  get,
  add,
  remove,
  getOneBook,
  edit,
  searchAuthor,
  searchTitle
}
