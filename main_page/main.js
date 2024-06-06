var swiper = new Swiper(".books-slider", {
  loop : true,
  centeredSlider: true,
  autoplay : {
    delay : 2500,
    disableOnIteraction: false,
    
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  loadBooks("bookList");
});

function addBookToDOM(name, image, containerId = "bookList") {
  const bookList = document.getElementById(containerId);

  const book = document.createElement("div");
  book.classList.add("box");

  const img = document.createElement("img");
  img.src = image;
  img.alt = name;

  const infoButton = document.createElement("a");
  infoButton.href = `../add_page/book.html?name=${encodeURIComponent(name)}`;
  infoButton.textContent = name;
  infoButton.classList.add("book__name");

  book.appendChild(img);
  book.appendChild(infoButton);

  
  book.addEventListener("click", () => {
    window.location.href = `../add_page/book.html?name=${encodeURIComponent(name)}`;
  });

  bookList.appendChild(book);
}

function loadBooks(containerId = "bookList") {
  let books = JSON.parse(sessionStorage.getItem("books")) || [];
  books.forEach((book) => {
    addBookToDOM(book.name, book.image, containerId);
  });
}







