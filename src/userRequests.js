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
function setLoggedName() {
  let spanTag = document.createElement("span");
  let node = document.createTextNode(
    getProfile().first_name + " " + getProfile().last_name
  );
  spanTag.appendChild(node);
  let loggedUser = document.getElementById("logged-user");
  loggedUser.appendChild(spanTag);
}

setLoggedName();

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
function showReqSpinner() {
  document.getElementById("req-loader").style.display = "block";
}

function hideReqSpinner() {
  document.getElementById("req-loader").style.display = "none";
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
          }, 3000);
        }
      });
  }, 2000);
}

showReqSpinner();
// async function
async function fetchRequests() {
  try {
    // await response of fetch call
    let response = await fetch(rootUrl + "users/requests", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("id_token")
      }
    });
    // only proceed once promise is resolved
    let data = await response.json();
    // If no requests present return fail
    if (data.status === "fail") {
      return "fail";
    }
    // only proceed once second promise is resolved
    return data;
  } catch (err) {
    console.error(err);
  } finally {
    hideReqSpinner();
  }
}
setTimeout(() => {
  fetchRequests()
    .then(data => {
      if (data === "fail") {
        let result = ``;

        result += `
            <div class="request-top" id="request-top">
              <p>You have no requests...</p>
            </div> 
          `;
        getElement("request-wrapper", result);
      } else {
        let result = ``;
        let requests = data.my_requests;
        requests.forEach(user => {
          const {
            current_status,
            request_id,
            first_name,
            last_name,
            to_char,
            request_title,
            request_description
          } = user;

          result += `
          <div class="request-top" id="request-top">
            <div class="request-top-left" id="request-top-left">
              <i class="far fa-calendar request-icons"></i>
              ${to_char}
            </div>
            <div class="request-top-right" id="request-top-right">
              <i class="fas fa-user request-icons"></i>
              ${first_name} ${last_name}
            </div>
          </div>
          <div class="request-mid">
            <div class="request-mid-left" id="request-title">
              <i class="fas fa-toolbox request-icons"></i>
              ${request_title.substr(0, 60)}...
            </div>
            <div class="request-mid-right">
              <span class="status-pending" id="the-status">${current_status}</span>
            </div>
          </div>
          <div class="request-body" id="request-body">
            <p class="request-body-p">
              ${request_description.substr(0, 120)}...
            </p>
          </div> 
          <a href="request-info.html?request_id=${request_id}"><i class="fas fa-info-circle"></i></a>
            <a href=""><i class="far fa-edit"></i> </a>
            <a href=""><i class="fas fa-trash-alt"></i></a>
        `;
          getElement("request-wrapper", result);
        });
      }
    })
    .catch(reason => console.log(reason.message));
}, 2000);
