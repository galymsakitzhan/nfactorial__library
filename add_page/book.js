document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const bookName = urlParams.get("name");

  if (bookName) {
    const books = JSON.parse(sessionStorage.getItem("books")) || [];
    const book = books.find((b) => b.name === bookName);

    if (book) {
      displayBookDetails(book);
      displayReviews(bookName);
      setupReviewForm(bookName);
    } else {
      document.getElementById("bookDetails").innerText = "Book not found.";
    }
  } else {
    document.getElementById("bookDetails").innerText = "No book specified.";
  }
});

function displayBookDetails(book) {
  const bookDetails = document.getElementById("bookDetails");

  const title = document.createElement("h1");
  title.textContent = book.name;
  title.classList.add("name__book");

  const img = document.createElement("img");
  img.src = book.image;
  img.alt = book.name;
  img.classList.add("image__book");

  bookDetails.appendChild(img);
  bookDetails.appendChild(title);

  const description = document.createElement("p");
  description.textContent = book.description;
  description.classList.add("description__book");

  document.getElementById("descriptionList").appendChild(description);
}

function setupReviewForm(bookName) {
  const reviewForm = document.getElementById("reviewForm");
  reviewForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const reviewText = document.getElementById("review").value.trim();
    const rating =
      document.querySelector(".star.selected")?.getAttribute("data-value") || 0;

    if (reviewText && rating > 0) {
      saveReview(bookName, reviewText, rating);
      displayReviews(bookName);
      reviewForm.reset();
      clearStarSelection();
    } else {
      alert("Please provide a rating and review.");
    }
  });

  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    star.addEventListener("click", function () {
      stars.forEach((s) => s.classList.remove("selected"));
      this.classList.add("selected");
    });
  });
}

function saveReview(bookName, reviewText, rating) {
  let reviews = JSON.parse(sessionStorage.getItem("reviews")) || [];
  reviews.push({
    bookName,
    reviewText,
    rating,
    date: new Date().toLocaleString(),
  });
  sessionStorage.setItem("reviews", JSON.stringify(reviews));
}

function displayReviews(bookName) {
  const reviewsList = document.getElementById("reviewsList");
  reviewsList.innerHTML = "";

  let reviews = JSON.parse(sessionStorage.getItem("reviews")) || [];
  reviews = reviews.filter((review) => review.bookName === bookName);

  reviews.forEach((review) => {
    const reviewDiv = document.createElement("div");
    reviewDiv.classList.add("review");

    const rating = document.createElement("div");
    rating.classList.add("rating");
    rating.innerHTML =
      "&#9733;".repeat(review.rating) + "&#9734;".repeat(5 - review.rating);

    const text = document.createElement("p");
    text.textContent = review.reviewText;

    const date = document.createElement("small");
    date.textContent = review.date;

    reviewDiv.appendChild(rating);
    reviewDiv.appendChild(text);
    reviewDiv.appendChild(date);

    reviewsList.appendChild(reviewDiv);
  });
}

function clearStarSelection() {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => star.classList.remove("selected"));
}
