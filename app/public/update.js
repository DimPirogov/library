let newBookForm = document.querySelector('#newBookForm')
let btnSaveChanges = document.querySelector('#saveChanges');
let title = document.querySelector('#title');
let author = document.querySelector('#author');
let year = document.querySelector('#year');
let genre = document.querySelector('#genre');
let amount = document.querySelector('#amount');

let id = window.location.pathname.split("/").pop();

async function loadBook() {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
  };

  let response = await fetch(`http://localhost:3001/book/get/${id}`, options)
    .catch(error => {console.error(error);});
  let data = await response.json();
  //console.log(data);
  title.value = data.title;
  author.value = data.author;
  year.value = data.year;
  genre.value = data.genre_id;
  amount.value = data.amount;
  //return data;
}

loadBook();

btnSaveChanges.addEventListener('click', () => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      bookId: id, title: title.value, author: author.value, year: year.value, genre: genre.value, amount: amount.value
    })
  };
  fetch('http://localhost:3001/book/edit', options)
    .then(response => console.log(response))
    .catch(error => {console.error(error);});
});
