import { rootUrl } from "./app";
import { checkToken, isAdmin, getProfile, getElement } from "./helpers";

// create user profile
checkToken().then(res => {
  if (res !== "success") {
    window.location.href = "../login.html";
  }
});
// If user is admin redirect them
if (isAdmin()) {
  window.location.href = "../admin/index.html";
}

// Append logged in user name
console.log(getProfile().first_name);
let spanTag = document.createElement("span");
let node = document.createTextNode(
  getProfile().first_name + " " + getProfile().last_name
);
spanTag.appendChild(node);
let loggedUser = document.getElementById("logged-user");
loggedUser.appendChild(spanTag);

// Create request fomrm
document
  .getElementById("request-form")
  .addEventListener("submit", requestFunction);

function showSpinner() {
  document.getElementById("loader").style.display = "block";
}
function showLabel() {
  document.getElementById("signup-label").style.display = "block";
}
function hideSpinner() {
  document.getElementById("loader").style.display = "none";
}
function hideLabel() {
  document.getElementById("signup-label").style.display = "none";
}

function requestFunction(event) {
  event.preventDefault();
  showSpinner();
  hideLabel();
  let title = document.getElementById("title").value,
    description = document.getElementById("description").value,
    result = ``;
  setTimeout(() => {
    fetch(rootUrl + "users/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("id_token")
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    })
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        if (res.status !== "success") {
          result += `<p class="err-msg">${res.msg}</p>`;
          getElement("res-message", result);
          console.log("Failed:", res);
          hideSpinner();
          showLabel();
        } else {
          result += `<p class="succ-msg">${res.msg} Reloading...</p>`;
          getElement("res-message", result);
          console.log("Success:", res);
          hideSpinner();
          showLabel();
          setTimeout(() => {
            window.location.reload(true);
          }, 4000);
        }
      });
  }, 2000);
}
