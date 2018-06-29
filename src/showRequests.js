import { rootUrl } from "./app";
import { getElement, isAdmin } from "./helpers";

console.log(isAdmin());

function showSpinner() {
  document.getElementById("loader").style.display = "block";
}

function hideSpinner() {
  document.getElementById("loader").style.display = "none";
}
showSpinner();
// async function
async function fetchRequests() {
  try {
    // await response of fetch call
    let response = await fetch(rootUrl + "requests");
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    return data;
  } catch (err) {
    console.error(err);
  } finally {
    hideSpinner();
  }
}
setTimeout(() => {
  fetchRequests()
    .then(data => {
      let result = ``;
      let requests = data.all_requests;
      requests.forEach(user => {
        const {
          current_status,
          request_id,
          request_title,
          request_description,
          email
        } = user;

        result += `
          <div class="request-top" id="request-top">
            <div class="request-top-left" id="request-top-left">
              <i class="far fa-calendar request-icons"></i>
              Request ID: ${request_id}
            </div>
            <div class="request-top-right" id="request-top-right">
              <i class="fas fa-user request-icons"></i>
              ${email}
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
              <button class="submit" ">More Details
                <i class="fas fa-chevron-circle-down"></i>
              </button>
            </p>
          </div> 
        `;
        getElement("request-wrapper", result);
      });
    })
    .catch(reason => console.log(reason.message));
}, 4000);
