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
function loggedIn() {
  // Checks if there is a saved token and it's still valid
  const token = getToken();
  return token;
}
function setProfile(profile) {
  // Saves profile data to localStorage
  localStorage.setItem("profile", JSON.stringify(profile));
}

function getProfile() {
  // Retrieves the profile data from localStorage
  const profile = localStorage.getItem("profile");
  return profile ? JSON.parse(localStorage.profile) : {};
}
function checkToken(redirectTo) {
  if (loggedIn()) {
    fetch(rootUrl + "auth/user", {
      method: "GET",
      headers: {
        Authorization: loggedIn()
      }
    })
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        if (res.status === "success") {
          setProfile(res.result);
          window.location.href = redirectTo;
        } else {
          console.log("Bad token or not exist");
          return "bad token";
        }
      });
  } else {
    console.log("No token");
  }
}
export {
  createNode,
  append,
  getElement,
  setToken,
  getToken,
  logout,
  loggedIn,
  checkToken,
  getProfile
};
