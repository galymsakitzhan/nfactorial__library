document.addEventListener("DOMContentLoaded", function () {
  loadBooks();

  document
    .getElementById("bookForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const bookName = document.getElementById("bookName").value.trim();
      const bookAuthor = document.getElementById("bookAuthor").value.trim();
      const bookImage = document.getElementById("bookImage").value.trim();
      const bookDescription = document
        .getElementById("bookDescription")
        .value.trim();

      if (bookName && bookAuthor && bookImage && bookDescription) {
        addBookToDOM(bookName, bookAuthor, bookImage);
        saveBook(bookName, bookAuthor, bookImage, bookDescription);

        document.getElementById("bookForm").reset();
      } else {
        alert("Please fill out all fields.");
      }
    });

  document
    .getElementById("searchInput")
    .addEventListener("input", function (event) {
      filterBooks(event.target.value.trim());
    });
});

function addBookToDOM(name, author, image, containerId = "bookList") {
  const bookList = document.getElementById(containerId);

  const book = document.createElement("div");
  book.classList.add("book");

  const img = document.createElement("img");
  img.src = image;
  img.alt = name;

  const bookName = document.createElement("h2");
  bookName.classList.add("add__book__name");
  bookName.textContent = name;

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("add__book__author");
  bookAuthor.textContent = author;

  book.appendChild(img);
  book.appendChild(bookName);
  book.appendChild(bookAuthor);

  bookList.appendChild(book);

  book.addEventListener("click", function () {
    window.location.href = `book.html?name=${encodeURIComponent(name)}`;
  });

  updateSuggestions();
}

function saveBook(name, author, image, description) {
  let books = JSON.parse(sessionStorage.getItem("books")) || [];
  books.push({ name, author, image, description });
  sessionStorage.setItem("books", JSON.stringify(books));
}

function loadBooks(containerId = "bookList") {
  let books = JSON.parse(sessionStorage.getItem("books")) || [];
  books.forEach((book) => {
    addBookToDOM(book.name, book.author, book.image, containerId);
  });
}

function filterBooks(query) {
  const bookList = document.getElementById("bookList");
  const books = JSON.parse(sessionStorage.getItem("books")) || [];
  bookList.innerHTML = "";

  books
    .filter(
      (book) =>
        book.name.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    )
    .forEach((book) => {
      addBookToDOM(book.name, book.author, book.image);
    });
}

function updateSuggestions() {
  const datalist = document.getElementById("bookSuggestions");
  const books = JSON.parse(sessionStorage.getItem("books")) || [];
  datalist.innerHTML = "";

  books.forEach((book) => {
    const option = document.createElement("option");
    option.value = book.name;
    datalist.appendChild(option);
  });
}
