function validatePassword() {
    var status = true;
    var password = document.getElementById("password").value;
    var passwordError = document.getElementById("passwordError");
    if (password == "") {
      status = false;
      passwordError.innerHTML = "please enter password";
      passwordError.style.color = "red";
    } else if (password.length < 6 || password.length > 10) {
      status = false;
      passwordError.innerHTML = "password must be between 6-10";
      passwordError.style.color = "red";
    } else passwordError.innerHTML = "";
    return status;
  }
  function validateEmail() {
    var status = true;
    var regex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");
    var email = document.getElementById("email").value;
    var emailError = document.getElementById("emailError");
    if (email == "") {
      status = false;
      emailError.innerHTML = "please enter email id";
      emailError.style.color = "red";
    } else if (!regex.test(email)) {
      status = false;
      emailError.innerHTML = "Invalid email id";
      emailError.style.color = "red";
    } else emailError.innerHTML = "";
    return status;
  }
  