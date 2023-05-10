const listBox = document.querySelector('#listBox');
const searchTitle = document.querySelector('#searchTitle');
const searchAuthor = document.querySelector('#searchAuthor');
const input = document.querySelector('#input');


async function listBooks() {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }

  let response = await fetch('http://localhost:3001/book', options)
    .catch(err => { console.log(err); });
  let data = await response.json();
  console.log(data);
  for (const book of data) {
    let p = document.createElement('p');
    let a = document.createElement('a');

    let span = document.createElement('span');
    span.id = book.bookId;
    span.innerHTML = 'RADERA';

    a.id = book.bookId;
    a.innerHTML = `"${book.title}", - ${book.author} (year: ${book.year}) totalt ${book.amount} st `;
    a.addEventListener('click', () => {
      listBox.innerHTML = '';
      window.location=`/update/${a.id}`
    })

    span.addEventListener('click', () => {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId: span.id })
      };
      fetch('http://localhost:3001/book/delete', options)
        .then(response => console.log(response))
        .catch(error => { console.error(error);});
      window.location.reload();
    });
    p.appendChild(a);
    p.appendChild(span)
    listBox.appendChild(p);
  }
}

listBooks();

async function searchResult(column){
  let data = await getSearchByString(column);
  listBox.innerHTML = '';
  for(const book of data) {
    let p = document.createElement('p');
    let a = document.createElement('a');

    let span = document.createElement('span');
    span.id = book.bookId;
    span.innerHTML = 'RADERA';

    a.id = book.bookId;
    a.innerHTML = `"${book.title}", - ${book.author} (year: ${book.year}) totalt ${book.amount} st `;
    a.addEventListener('click', () => {
      listBox.innerHTML = '';
      window.location=`/update/${a.id}`
    })

    span.addEventListener('click', () => {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId: span.id })
      };
      fetch('http://localhost:3001/book/delete', options)
        .then(response => console.log(response))
        .catch(error => { console.error(error);});
      window.location.reload();
    });
    p.appendChild(a);
    p.appendChild(span)
    listBox.appendChild(p);
  }
};

async function getSearchByString(column) {
  let str = input.value;
  let response = '';
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
  }}
  if(column == 'author'){
    response =  await fetch('http://localhost:3001/book/searchauthor?' +
                            new URLSearchParams({str: str}), options)
                              .catch(error => { console.error(error); });
  }else{
    response =  await fetch('http://localhost:3001/book/searchtitle?' +
                            new URLSearchParams({str: str}), options)
                              .catch(error => { console.error(error); });
  }
  let data = await response.json();
  return data;
};

searchAuthor.addEventListener('click', () => {
  searchResult('author');
});
searchTitle.addEventListener('click', () => {
  searchResult('title');
});
