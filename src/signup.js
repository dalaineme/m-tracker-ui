import { rootUrl } from "./app";
import { getElement } from "./helpers";

document
  .getElementById("signup-form")
  .addEventListener("submit", signupFunction);

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
function validatePassword() {
  if (password.value != cpassword.value) {
    cpassword.setCustomValidity("Passwords Don't Match");
  } else {
    cpassword.setCustomValidity("");
  }
}

password.onchange = validatePassword;
cpassword.onkeyup = validatePassword;

function signupFunction(event) {
  event.preventDefault();
  showSpinner();
  hideLabel();
  let first_name = document.getElementById("first_name").value,
    last_name = document.getElementById("last_name").value,
    email = document.getElementById("email").value,
    password = document.getElementById("password").value,
    cpassword = document.getElementById("cpassword").value,
    result = ``;
  setTimeout(() => {
    fetch(rootUrl + "auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        if (res.status === "fail") {
          result += `<p class="err-msg">${res.msg}</p>`;
          getElement("res-message", result);
          console.log("Failed:", res);
          hideSpinner();
          showLabel();
        } else {
          result += `<p class="succ-msg">${res.msg} Redirecting ...</p>`;
          getElement("res-message", result);
          console.log("Success:", res);
          hideSpinner();
          showLabel();
          setTimeout(() => {
            window.location.href = "login.html";
          }, 4000);
        }
      });
  }, 2000);
}
