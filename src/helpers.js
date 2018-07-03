import { rootUrl } from "./app";

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}
function getElement(element, value) {
  return (document.getElementById(element).innerHTML = value);
}
function setToken(idToken) {
  // Saves user token to localStorage
  localStorage.setItem("id_token", idToken);
  return "Token Set";
}

function getToken() {
  // Retrieves the user token from localStorage
  return localStorage.getItem("id_token");
}

function logout() {
  // Clear user token and profile data from localStorage
  localStorage.removeItem("id_token");
  localStorage.removeItem("profile");
}
// function loggedIn() {
//   // Checks if there is a saved token and it's still valid
//   const token = getToken();
//   return true;
// }
function setProfile(profile) {
  // Saves profile data to localStorage
  localStorage.setItem("profile", JSON.stringify(profile));
}

function getProfile() {
  // Retrieves the profile data from localStorage
  const profile = localStorage.getItem("profile");
  return profile ? JSON.parse(localStorage.profile) : {};
}
// Check if token exists and or valid
function checkToken() {
  return fetch(rootUrl + "auth/user", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("id_token")
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(res => {
      if (res.msg === "success") {
        localStorage.setItem("profile", JSON.stringify(res.result));
        return "success";
      } else {
        console.log("Bad token or not exist");
        return "fail";
      }
    });
}

/// Check user level

function isAdmin() {
  let user = getProfile();
  if (user.user_level == "Admin") {
    return true;
  } else {
    return false;
  }
}

const urlParam = (name, w) => {
  w = w || window;
  let rx = new RegExp("[&|?]" + name + "=([^&#]+)"),
    val = w.location.search.match(rx);
  return !val ? "" : val[1];
};
export {
  createNode,
  append,
  getElement,
  setToken,
  getToken,
  logout,
  checkToken,
  getProfile,
  isAdmin,
  urlParam
};
