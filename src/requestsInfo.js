import { rootUrl } from "./app";
import {
  checkToken,
  isAdmin,
  getProfile,
  getElement,
  urlParam
} from "./helpers";
const request_id = urlParam("request_id");

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

function showReqSpinner() {
  document.getElementById("req-loader").style.display = "block";
}

function hideReqSpinner() {
  document.getElementById("req-loader").style.display = "none";
}

showReqSpinner();
// async function
async function fetchRequests() {
  try {
    // await response of fetch call
    let response = await fetch(rootUrl + `users/requests/${request_id}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("id_token")
      }
    });
    // only proceed once promise is resolved
    let data = await response.json();
    // If no requests present return fail
    if (data.status !== "success") {
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
        let result = `
            <div class="request-top" id="request-top">
              <p>Wrong request ID, Please check the URL...</p>
            </div> 
          `;
        getElement("request-wrapper", result);
      } else {
        let requests = data.request;

        let result = `
          <div class="request-top" id="request-top">
            <div class="request-top-left" id="request-top-left">
              <i class="far fa-calendar request-icons"></i>
              ${requests.current_status}
            </div>
            <div class="request-top-right" id="request-top-right">
              <i class="fas fa-envelope-square request-icons"></i>
              ${requests.my_email}
            </div>
          </div>
          <div class="request-mid">
            <div class="request-mid-left" id="request-title">
              <i class="fas fa-toolbox request-icons"></i>
              ${requests.request_title}...
            </div>
            <div class="request-mid-right">
              <span class="status-pending" id="the-status">${
                requests.current_status
              }</span>
            </div>
          </div>
          <div class="request-body" id="request-body">
            <p class="request-body-p">
              ${requests.request_description}...
            </p>
          </div> 
          `;
        getElement("request-wrapper", result);
      }
    })
    .catch(reason => console.log(reason.message));
}, 1000);
