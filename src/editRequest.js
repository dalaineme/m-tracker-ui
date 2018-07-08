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
        getElement("hide-the-filter", result);
    } else {
        let requests = data.request;
        let logs = requests.status_logs;

        

        let result = `
        <div id="res-message">
            <!-- Error or success message shown here -->
        </div>
        <div class="filter-left">
            <label for="">Request Title</label>
            <input type="text" id="title" name="title" placeholder="Title" minlength="20" maxlength="100" required value="${requests.request_title}">
        </div>
        <div class="filter-mid"> 
            <label for="">Request Description</label>
            <textarea name="" id="description" name="description" minlength="50">${requests.request_description}</textarea>
        </div>
        <div class="filter-right">
            <label for="">
            <br> 
            </label>
            <button class="submit">
            <span id="signup-label" style="display: block">
                Edit Request
            </span>
            <img id="loader" src="../../loader.gif" style="display:none; margin-left: auto; margin-right: auto; width: 5%;" alt="">
            </button>
        </div>
        `;
        getElement("request-form", result);
    }
    })
    .catch(reason => console.log(reason.message));
}, 1000);
