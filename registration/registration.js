document
  .getElementById("register-button")
  .addEventListener("click", function () {
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeat-password").value;

    if (password === repeatPassword) {
      sessionStorage.setItem("login", login);
      sessionStorage.setItem("password", password);
      alert("Registration successful!");
    } else {
      alert("Passwords do not match!");
    }
  });
