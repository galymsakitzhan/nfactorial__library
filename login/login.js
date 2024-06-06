'use strict';

document
  .getElementById("login-button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;

    var storedLogin = sessionStorage.getItem("login");
    var storedPassword = sessionStorage.getItem("password");

    if (login === storedLogin && password === storedPassword) {
      window.location.href = "main_page/main.html";
    } else {
      document.getElementById("error-message").textContent =
        "Invalid login or password!";
    }
  });

