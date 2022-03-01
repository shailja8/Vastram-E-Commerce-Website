function validateData() {
    var name = validateName();
    var pricestatus = validatePrice();
    var qtystatus = validateQty();
    var sizestatus = validateSize();
    if (
      name &&
      pricestatus &&
      qtystatus &&
      sizestatus
    )
      return true;
    return false;
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

  function validatePrice() {
    var status = true;
    var price = document.getElementById("price").value;
    var priceError = document.getElementById("priceError");
    if (price == "") {
      status = false;
      priceError.innerHTML = "please enter price";
      priceError.style.color = "red";
    }
     else if (isNaN(price)) {
      status = false;
      priceError.innerHTML = "Only digit allowed";
      priceError.style.color = "red";
    } 
     else priceError.innerHTML = "";
    return status;
  }

  function validateQty(){
  var status = true;
    var qty = document.getElementById("qty").value;
    var qtyError = document.getElementById("qtyError");
    if (qty == "") {
      status = false;
      qtyError.innerHTML = "please enter quantity";
      qtyError.style.color = "red";
    }
    //  else if (isNaN(qty)) {
    //   status = false;
    //   qtyError.innerHTML = "Only digit allowed";
    //   qtyError.style.color = "red";
    // } 
     else qtyError.innerHTML = "";
    return status;
  }

  function validateSize(){
    var status = true;
      var size = document.getElementById("size").value;
      var sizeError = document.getElementById("sizeError");
      if (size == "") {
        status = false;
        sizeError.innerHTML = "please enter size";
        sizeError.style.color = "red";
      }
       else if (size!='S'||size!='s'||size!='M'||size!='m'||size!='XL'||size!='xl'||size!='XXL'||size!='xxl'||size!='l'||size!='L') {
        status = false;
        sizeError.innerHTML = "Enter correct size";
        sizeError.style.color = "red";
      } 
       else sizeError.innerHTML = "";
      return status;
    }
   