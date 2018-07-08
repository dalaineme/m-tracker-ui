/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/UI/assets/js";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/editRequest.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Root URL
var rootUrl = "http://127.0.0.1:5000/api/v1/";

exports.rootUrl = rootUrl;

/***/ }),

/***/ "./src/editRequest.js":
/*!****************************!*\
  !*** ./src/editRequest.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(/*! ./app */ "./src/app.js");

var _helpers = __webpack_require__(/*! ./helpers */ "./src/helpers.js");

// create user profile
(0, _helpers.checkToken)().then(function (res) {
  if (res !== "success") {
    window.location.href = "../login.html";
  }
});
// If user is admin redirect them
if ((0, _helpers.isAdmin)()) {
  window.location.href = "../admin/index.html";
}

// Append logged in user name
function setLoggedName() {
  var spanTag = document.createElement("span");
  var node = document.createTextNode((0, _helpers.getProfile)().first_name + " " + (0, _helpers.getProfile)().last_name);
  spanTag.appendChild(node);
  var loggedUser = document.getElementById("logged-user");
  loggedUser.appendChild(spanTag);
}

setLoggedName();

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlParam = exports.isAdmin = exports.getProfile = exports.checkToken = exports.logout = exports.getToken = exports.setToken = exports.getElement = exports.append = exports.createNode = undefined;

var _app = __webpack_require__(/*! ./app */ "./src/app.js");

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}
function getElement(element, value) {
  return document.getElementById(element).innerHTML = value;
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
  var profile = localStorage.getItem("profile");
  return profile ? JSON.parse(localStorage.profile) : {};
}
// Check if token exists and or valid
function checkToken() {
  return fetch(_app.rootUrl + "auth/user", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("id_token")
    }
  }).then(function (res) {
    return res.json();
  }).catch(function (err) {
    return console.log(err);
  }).then(function (res) {
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
  var user = getProfile();
  if (user.user_level == "Admin") {
    return true;
  } else {
    return false;
  }
}

var urlParam = function urlParam(name, w) {
  w = w || window;
  var rx = new RegExp("[&|?]" + name + "=([^&#]+)"),
      val = w.location.search.match(rx);
  return !val ? "" : val[1];
};
exports.createNode = createNode;
exports.append = append;
exports.getElement = getElement;
exports.setToken = setToken;
exports.getToken = getToken;
exports.logout = logout;
exports.checkToken = checkToken;
exports.getProfile = getProfile;
exports.isAdmin = isAdmin;
exports.urlParam = urlParam;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRpdFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMuanMiXSwibmFtZXMiOlsicm9vdFVybCIsInRoZW4iLCJyZXMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzZXRMb2dnZWROYW1lIiwic3BhblRhZyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIm5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsImZpcnN0X25hbWUiLCJsYXN0X25hbWUiLCJhcHBlbmRDaGlsZCIsImxvZ2dlZFVzZXIiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZU5vZGUiLCJlbGVtZW50IiwiYXBwZW5kIiwicGFyZW50IiwiZWwiLCJnZXRFbGVtZW50IiwidmFsdWUiLCJpbm5lckhUTUwiLCJzZXRUb2tlbiIsImlkVG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0VG9rZW4iLCJnZXRJdGVtIiwibG9nb3V0IiwicmVtb3ZlSXRlbSIsInNldFByb2ZpbGUiLCJwcm9maWxlIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFByb2ZpbGUiLCJwYXJzZSIsImNoZWNrVG9rZW4iLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwianNvbiIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsImVyciIsIm1zZyIsInJlc3VsdCIsImlzQWRtaW4iLCJ1c2VyIiwidXNlcl9sZXZlbCIsInVybFBhcmFtIiwibmFtZSIsInciLCJyeCIsIlJlZ0V4cCIsInZhbCIsInNlYXJjaCIsIm1hdGNoIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FB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SixDQUFuQjtBQUNELENBTEQ7UUFPRTFDLFUsR0FBQUEsVTtRQUNBRSxNLEdBQUFBLE07UUFDQUcsVSxHQUFBQSxVO1FBQ0FHLFEsR0FBQUEsUTtRQUNBSSxRLEdBQUFBLFE7UUFDQUUsTSxHQUFBQSxNO1FBQ0FRLFUsR0FBQUEsVTtRQUNBRixVLEdBQUFBLFU7UUFDQWMsTyxHQUFBQSxPO1FBQ0FHLFEsR0FBQUEsUSIsImZpbGUiOiJlZGl0UmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1VJL2Fzc2V0cy9qc1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9lZGl0UmVxdWVzdC5qc1wiKTtcbiIsIi8vIFJvb3QgVVJMXG5jb25zdCByb290VXJsID0gXCJodHRwOi8vMTI3LjAuMC4xOjUwMDAvYXBpL3YxL1wiO1xuXG5leHBvcnQgeyByb290VXJsIH07XG4iLCJpbXBvcnQgeyByb290VXJsIH0gZnJvbSBcIi4vYXBwXCI7XG5pbXBvcnQgeyBjaGVja1Rva2VuLCBpc0FkbWluLCBnZXRQcm9maWxlLCBnZXRFbGVtZW50IH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG4vLyBjcmVhdGUgdXNlciBwcm9maWxlXG5jaGVja1Rva2VuKCkudGhlbihyZXMgPT4ge1xuICBpZiAocmVzICE9PSBcInN1Y2Nlc3NcIikge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuLi9sb2dpbi5odG1sXCI7XG4gIH1cbn0pO1xuLy8gSWYgdXNlciBpcyBhZG1pbiByZWRpcmVjdCB0aGVtXG5pZiAoaXNBZG1pbigpKSB7XG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuLi9hZG1pbi9pbmRleC5odG1sXCI7XG59XG5cbi8vIEFwcGVuZCBsb2dnZWQgaW4gdXNlciBuYW1lXG5mdW5jdGlvbiBzZXRMb2dnZWROYW1lKCkge1xuICBsZXQgc3BhblRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFxuICAgIGdldFByb2ZpbGUoKS5maXJzdF9uYW1lICsgXCIgXCIgKyBnZXRQcm9maWxlKCkubGFzdF9uYW1lXG4gICk7XG4gIHNwYW5UYWcuYXBwZW5kQ2hpbGQobm9kZSk7XG4gIGxldCBsb2dnZWRVc2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dnZWQtdXNlclwiKTtcbiAgbG9nZ2VkVXNlci5hcHBlbmRDaGlsZChzcGFuVGFnKTtcbn1cblxuc2V0TG9nZ2VkTmFtZSgpO1xuXG4iLCJpbXBvcnQgeyByb290VXJsIH0gZnJvbSBcIi4vYXBwXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGUoZWxlbWVudCkge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kKHBhcmVudCwgZWwpIHtcbiAgcmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChlbCk7XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50KGVsZW1lbnQsIHZhbHVlKSB7XG4gIHJldHVybiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCkuaW5uZXJIVE1MID0gdmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0VG9rZW4oaWRUb2tlbikge1xuICAvLyBTYXZlcyB1c2VyIHRva2VuIHRvIGxvY2FsU3RvcmFnZVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImlkX3Rva2VuXCIsIGlkVG9rZW4pO1xuICByZXR1cm4gXCJUb2tlbiBTZXRcIjtcbn1cblxuZnVuY3Rpb24gZ2V0VG9rZW4oKSB7XG4gIC8vIFJldHJpZXZlcyB0aGUgdXNlciB0b2tlbiBmcm9tIGxvY2FsU3RvcmFnZVxuICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpZF90b2tlblwiKTtcbn1cblxuZnVuY3Rpb24gbG9nb3V0KCkge1xuICAvLyBDbGVhciB1c2VyIHRva2VuIGFuZCBwcm9maWxlIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJpZF90b2tlblwiKTtcbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJwcm9maWxlXCIpO1xufVxuLy8gZnVuY3Rpb24gbG9nZ2VkSW4oKSB7XG4vLyAgIC8vIENoZWNrcyBpZiB0aGVyZSBpcyBhIHNhdmVkIHRva2VuIGFuZCBpdCdzIHN0aWxsIHZhbGlkXG4vLyAgIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKTtcbi8vICAgcmV0dXJuIHRydWU7XG4vLyB9XG5mdW5jdGlvbiBzZXRQcm9maWxlKHByb2ZpbGUpIHtcbiAgLy8gU2F2ZXMgcHJvZmlsZSBkYXRhIHRvIGxvY2FsU3RvcmFnZVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2ZpbGVcIiwgSlNPTi5zdHJpbmdpZnkocHJvZmlsZSkpO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9maWxlKCkge1xuICAvLyBSZXRyaWV2ZXMgdGhlIHByb2ZpbGUgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxuICBjb25zdCBwcm9maWxlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9maWxlXCIpO1xuICByZXR1cm4gcHJvZmlsZSA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLnByb2ZpbGUpIDoge307XG59XG4vLyBDaGVjayBpZiB0b2tlbiBleGlzdHMgYW5kIG9yIHZhbGlkXG5mdW5jdGlvbiBjaGVja1Rva2VuKCkge1xuICByZXR1cm4gZmV0Y2gocm9vdFVybCArIFwiYXV0aC91c2VyXCIsIHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpZF90b2tlblwiKVxuICAgIH1cbiAgfSlcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMubXNnID09PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2ZpbGVcIiwgSlNPTi5zdHJpbmdpZnkocmVzLnJlc3VsdCkpO1xuICAgICAgICByZXR1cm4gXCJzdWNjZXNzXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkJhZCB0b2tlbiBvciBub3QgZXhpc3RcIik7XG4gICAgICAgIHJldHVybiBcImZhaWxcIjtcbiAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8vIENoZWNrIHVzZXIgbGV2ZWxcblxuZnVuY3Rpb24gaXNBZG1pbigpIHtcbiAgbGV0IHVzZXIgPSBnZXRQcm9maWxlKCk7XG4gIGlmICh1c2VyLnVzZXJfbGV2ZWwgPT0gXCJBZG1pblwiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmNvbnN0IHVybFBhcmFtID0gKG5hbWUsIHcpID0+IHtcbiAgdyA9IHcgfHwgd2luZG93O1xuICBsZXQgcnggPSBuZXcgUmVnRXhwKFwiWyZ8P11cIiArIG5hbWUgKyBcIj0oW14mI10rKVwiKSxcbiAgICB2YWwgPSB3LmxvY2F0aW9uLnNlYXJjaC5tYXRjaChyeCk7XG4gIHJldHVybiAhdmFsID8gXCJcIiA6IHZhbFsxXTtcbn07XG5leHBvcnQge1xuICBjcmVhdGVOb2RlLFxuICBhcHBlbmQsXG4gIGdldEVsZW1lbnQsXG4gIHNldFRva2VuLFxuICBnZXRUb2tlbixcbiAgbG9nb3V0LFxuICBjaGVja1Rva2VuLFxuICBnZXRQcm9maWxlLFxuICBpc0FkbWluLFxuICB1cmxQYXJhbVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=