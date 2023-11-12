const submitBtn = document.querySelector(".submit__btn");
const userName = document.querySelector("#user");
const comment = document.querySelector("#comment");
const likeIcon = document.querySelector(".heart__icon");
const count = document.querySelector(".count");
const commentsCont = document.querySelector(".comments__container");

likeIcon.addEventListener("click", likeVideo);
submitBtn.addEventListener("click", submitFeedback);

// let feedbackArr = [];
let positiveFeedback = false;
let likesCount = 1599;

let getlistCommentFromLocalstrorage = JSON.parse(
  localStorage.getItem("comments_Tester")
);
if (getlistCommentFromLocalstrorage == null) {
  localStorage.setItem("comments_Tester", JSON.stringify([]));
  window.location.reload();
} else {
  for (let i = 0; i < getlistCommentFromLocalstrorage.length; i++) {
    addFeedback(getlistCommentFromLocalstrorage[i]);
  }
}
userName.value = localStorage.getItem("email");
function submitFeedback(e) {
  e.preventDefault();
  // get user name
  const userForm = userName.value;
  // get feedback
  const commentForm = comment.value;
  // if inputs are not empty
  if (userForm && commentForm !== "") {
    // create new feedback
    let newFeedback = {
      id: Math.floor(Math.random() * 1000 + 1),
      userName: userForm,
      userComment: commentForm,
      typeOfFeedback: positiveFeedback,
    };
    // add new feedback to array
    getlistCommentFromLocalstrorage.push(newFeedback);
    localStorage.setItem(
      "comments_Tester",
      JSON.stringify(getlistCommentFromLocalstrorage)
    );
    // if liked add to count
    if (positiveFeedback === true) {
      addLikes();
    }
    // clear inputs
    resetForm();
    // add feedback to list
    addFeedback(newFeedback);
  }
}

function likeVideo() {
  likeIcon.classList.toggle("liked");

  if (likeIcon.classList.contains("liked")) {
    likeIcon.innerHTML = `<i class="fas fa-heart"></i>`;
    // set feedback to liked
    positiveFeedback = true;
  } else {
    likeIcon.innerHTML = `<i class="far fa-heart"></i>`;
    // set feedback to not liked
    positiveFeedback = false;
  }
}

function addLikes() {
  likesCount++;
  count.innerHTML = likesCount;
}

function resetForm() {
  comment.value = "";
  likeIcon.innerHTML = `<i class="far fa-heart"></i>`;
  positiveFeedback = false;
}

function addFeedback(item) {
  // select first letter of the user name
  const letter = item.userName.charAt(0);
  // create new div
  const div = document.createElement("div");
  // add class
  div.classList = "comment__card";
  // add id
  div.id = item.id;
  // add html
  div.innerHTML = `
      <div class="pic center__display">
                      ${letter}
                  </div>
                  <div class="comment__info">
                      <small class="nickname">
                          ${item.userName}
                      </small>
                      <p class="comment">
                          ${item.userComment}
                      </p>
                      <div class="comment__bottom">
                          <div class="heart__icon--comment">
                              ${
                                item.typeOfFeedback
                                  ? `<i class="fas fa-heart positive"></i>`
                                  : `<i class="far fa-heart"></i>`
                              }
                          </div>
                          <button>
                              Reply
                          </button>
                      </div>
                  </div>
      `;
  // insert feedback into the list
  commentsCont.insertAdjacentElement("beforeend", div);
}
let heading = document.getElementById("personal_name");
heading.innerHTML = localStorage.getItem("email");

let logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("email");
  localStorage.removeItem("username");
  localStorage.removeItem("courses");
  localStorage.removeItem("userid");
  localStorage.removeItem("firebase:host:lastspck-default-rtdb.firebaseio.com");
  location.assign("index.html");
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtfTLB0JTYeqZALLTEzBio242e6RtCWb4",
  authDomain: "lastspck.firebaseapp.com",
  projectId: "lastspck",
  storageBucket: "lastspck.appspot.com",
  messagingSenderId: "1025486694733",
  appId: "1:1025486694733:web:48d7d2f8d5d15f068bef04",
  measurementId: "G-RRRLCH6CX1",
};
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
////////////////////////////////////////
let coursename;
document.getElementById("update").onclick = function () {
  let userid = localStorage.getItem("userid");
  coursename = document.getElementById("coursenameTester").innerHTML;
  console.log(coursename);
  let coursesfromLocalstrorage = JSON.parse(localStorage.getItem("courses"));
  if (coursesfromLocalstrorage != null) {
    let check = coursesfromLocalstrorage.includes(coursename);
    if (check == true) {
      alert("Bạn không thể đăng kí thêm");
    } else {
      coursesfromLocalstrorage.push(coursename);
      localStorage.setItem("courses", JSON.stringify(coursesfromLocalstrorage));
      alert("Bạn đã đăng kí thành công");
    }
  }
  update(ref(database, "users/" + userid), {
    courses: coursesfromLocalstrorage,
  });
  // // document.getElementById("roll").value = "";
  // document.getElementById("name").value = "";
  // document.getElementById("gender").value = "";
  // document.getElementById("address").value = "";
};
