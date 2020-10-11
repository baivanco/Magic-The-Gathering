//Submit Name to LocalStorage
function handleSubmit() {
  const name = document.getElementById("name").value;
  localStorage.setItem("NAME", name);
  return;
}

//Input form Validation
function validateForm() {
  var name = document.getElementById("name").value;

  //Minimum 3 characters Validation
  if (name.length < 3) {
    document.getElementById("min-char").style.display = "block";
    return false;
  } else {
    document.getElementById("min-char").style.display = "none";
  }

  //First character Uppercase Validation
  if (name[0] == name[0].toLowerCase()) {
    document.getElementById("first-upper").style.display = "block";
    return false;
  } else {
    document.getElementById("first-upper").style.display = "none";
  }

  return;
}
