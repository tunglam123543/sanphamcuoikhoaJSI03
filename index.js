var slidePosition = 1;
SlideShow(slidePosition);

// forward/Back controls
function plusSlides(n) {
  SlideShow((slidePosition += n));
}

//  images controls
function currentSlide(n) {
  SlideShow((slidePosition = n));
}

function SlideShow(n) {
  var i;
  var slides = document.getElementsByClassName("Containers");
  var circles = document.getElementsByClassName("dots");
  if (n > slides.length) {
    slidePosition = 1;
  }
  if (n < 1) {
    slidePosition = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < circles.length; i++) {
    circles[i].className = circles[i].className.replace(" enable", "");
  }
  slides[slidePosition - 1].style.display = "block";
  circles[slidePosition - 1].className += " enable";
}

let heading = document.getElementById("personal_name");
heading.innerHTML = localStorage.getItem("email");

let logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", function () {
  localStorage.clear();
  location.assign("index.html");
});

let locationShow = document.getElementById("location_nph");
let temperature = document.getElementById("nhietdo");

fetch("https://geocoding-api.open-meteo.com/v1/search?name=Hanoi")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    locationShow.innerHTML = data.results[0].name;
    let templink = `https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current_weather=true`;
    fetch(templink)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        temperature.innerHTML = data.current_weather.temperature + "°C";
      });
  });

var chatbox = document.getElementById("fb-customer-chat");
chatbox.setAttribute("page_id", "115401948310967");
chatbox.setAttribute("attribution", "biz_inbox");

window.fbAsyncInit = function () {
  FB.init({
    xfbml: true,
    version: "v18.0",
  });
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
