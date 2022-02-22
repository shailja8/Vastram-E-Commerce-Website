function validateData() {
    var nameStatus = validateName();
    var passwordStatus = validatePassword();
    var mobileStatus = validateMobile();
    var emailStatus = validateEmail();
    var genderStatus = validateGender();
    var addressStatus = validateAddress();
    if (
      nameStatus &&
      passwordStatus &&
      mobileStatus &&
      emailStatus &&
      genderStatus &&
      addressStatus
    )
      return true;
    return false;
  }
  function validateMobile() {
    var status = true;
    var mobile = document.getElementById("mobile").value;
    var mobileError = document.getElementById("mobileError");
    if (mobile == "") {
      status = false;
      mobileError.innerHTML = "please enter mobile number";
      mobileError.style.color = "red";
    } else if (isNaN(mobile)) {
      status = false;
      mobileError.innerHTML = "Only digit allowed";
      mobileError.style.color = "red";
    } else if (mobile.length != 10) {
      status = false;
      mobileError.innerHTML = "Mobile must contain 10 digit";
      mobileError.style.color = "red";
    } else mobileError.innerHTML = "";
    return status;
  }
  function validateName() {
    var status = true;
    var name = document.getElementById("name").value;
    var nameError = document.getElementById("nameError");

    if (name == "") {
      status = false;
      nameError.innerHTML = "please enter username";
      nameError.style.color = "red";
    } else nameError.innerHTML = "";
    return status;
  }

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
 

  function validateGender() {
    var status = true;
    var genderError = document.getElementById("genderError");
    if (
      document.getElementById("male").checked == false &&
      document.getElementById("female").checked == false
    ) {
      status = false;
      genderError.innerHTML = "<br>please select gender";
      genderError.style.color = "red";
    } else genderError.innerHTML = "";
    return status;
  }

  function validateAddress() {
    var status = true;
    var Address = document.getElementById("address").value;
    var addressError = document.getElementById("addressError");
    if (Address == "") {
      status = false;
      addressError.innerHTML = "please enter address";
      addressError.style.color = "red";
    } else addressError.innerHTML = "";
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
  