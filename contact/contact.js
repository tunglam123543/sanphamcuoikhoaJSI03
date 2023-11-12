let heading = document.getElementById("personal_name");
heading.innerHTML = localStorage.getItem("email");

let logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", function () {
  localStorage.clear();
  location.assign("index.html");
});
