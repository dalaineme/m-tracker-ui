import { rootUrl } from "./app";
import { getElement, setToken, checkToken } from "./helpers";

// Check token, if exists and valid, redirect to profile
checkToken().then(res => {
  if (res === "success") {
    window.location.href = "user/index.html";
  }
});

document.getElementById("login-form").addEventListener("submit", loginFunction);

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

function loginFunction(event) {
  event.preventDefault();
  showSpinner();
  hideLabel();
  let email = document.getElementById("email").value,
    password = document.getElementById("password").value,
    result = ``;
  setTimeout(() => {
    fetch(rootUrl + "auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
          // set token
          console.log(res.token);
          console.log(setToken(res.token));
          if (res.user_level === "Admin") {
            window.location.href = "admin/index.html";
            console.log("Success:", res);
            hideSpinner();
            showLabel();
          } else {
            window.location.href = "user/index.html";
            console.log("Success:", res);
            hideSpinner();
            showLabel();
          }
        }
      });
  }, 2000);
}
