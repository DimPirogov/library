let newBookForm = document.querySelector('#newBookForm')
let btnSaveNewBook = document.querySelector('#saveNewBook');
let title = document.querySelector('#title');
let author = document.querySelector('#author');
let year = document.querySelector('#year');
let genre = document.querySelector('#genre');
let amount = document.querySelector('#amount');

btnSaveNewBook.addEventListener('click', () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: title.value, author: author.value,
      year: year.value, genre: genre.value, amount: amount.value
    })
  };
  fetch('http://localhost:3001/book/add', options)
    .then(response => console.log(response))
    .catch(err => {console.error(err);
  });
});
