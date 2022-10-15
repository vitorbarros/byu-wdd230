const input = document.getElementsByName('book')[0];
const button = document.getElementById('save-button');
const list = document.getElementById('list');

let books = [];

const fetchDatabase = () => {
  books = [];
  const json = window.localStorage.getItem('books');
  books = JSON.parse(json) || [];
}

const formatList = () => {
  fetchDatabase();

  list.innerHTML = '';
  books.forEach((book, index) => {
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('id', `delete-button-${index}`);
    deleteButton.setAttribute('class', 'delete-button');
    deleteButton.setAttribute('onclick', `deleteItem(${index})`);
    deleteButton.innerHTML = "❌";

    const innerWrapper = document.createElement('div');
    innerWrapper.setAttribute('class', 'list-item-wrapper');

    const text = document.createElement('p');
    text.innerHTML = book;

    innerWrapper.appendChild(text);
    innerWrapper.appendChild(deleteButton);

    const li = document.createElement('li');
    li.appendChild(innerWrapper);

    list.appendChild(li);
  });
}

const saveToDatabase = () => {
  const json = JSON.stringify(books);
  window.localStorage.setItem('books', json);
}

const addToList = () => {
  button.addEventListener('click', () => {
    const val = input.value;

    const alreadyExists = books.some((book) => book === val);

    if (val && !alreadyExists) {
      books.push(val);
      saveToDatabase();
      formatList();
    }

    input.value = '';
  });
}

const deleteItem = (index) => {
  books.splice(index, 1);
  saveToDatabase();
  formatList();
}

(() => {
  formatList();
  addToList();
})();
