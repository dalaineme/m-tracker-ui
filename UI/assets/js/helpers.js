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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/helpers.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyJdLCJuYW1lcyI6WyJyb290VXJsIiwiY3JlYXRlTm9kZSIsImVsZW1lbnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmQiLCJwYXJlbnQiLCJlbCIsImFwcGVuZENoaWxkIiwiZ2V0RWxlbWVudCIsInZhbHVlIiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJzZXRUb2tlbiIsImlkVG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0VG9rZW4iLCJnZXRJdGVtIiwibG9nb3V0IiwicmVtb3ZlSXRlbSIsInNldFByb2ZpbGUiLCJwcm9maWxlIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFByb2ZpbGUiLCJwYXJzZSIsImNoZWNrVG9rZW4iLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwidGhlbiIsInJlcyIsImpzb24iLCJjYXRjaCIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCJtc2ciLCJyZXN1bHQiLCJpc0FkbWluIiwidXNlciIsInVzZXJfbGV2ZWwiLCJ1cmxQYXJhbSIsIm5hbWUiLCJ3Iiwid2luZG93IiwicngiLCJSZWdFeHAiLCJ2YWwiLCJsb2NhdGlvbiIsInNlYXJjaCIsIm1hdGNoIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFj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QUFQO0FBQ0Q7QUFDRjs7QUFFRCxJQUFNQyxXQUFXLFNBQVhBLFFBQVcsQ0FBQ0MsSUFBRCxFQUFPQyxDQUFQLEVBQWE7QUFDNUJBLE1BQUlBLEtBQUtDLE1BQVQ7QUFDQSxNQUFJQyxLQUFLLElBQUlDLE1BQUosQ0FBVyxVQUFVSixJQUFWLEdBQWlCLFdBQTVCLENBQVQ7QUFBQSxNQUNFSyxNQUFNSixFQUFFSyxRQUFGLENBQVdDLE1BQVgsQ0FBa0JDLEtBQWxCLENBQXdCTCxFQUF4QixDQURSO0FBRUEsU0FBTyxDQUFDRSxHQUFELEdBQU8sRUFBUCxHQUFZQSxJQUFJLENBQUosQ0FBbkI7QUFDRCxDQUxEO1FBT0VqRCxVLEdBQUFBLFU7UUFDQUksTSxHQUFBQSxNO1FBQ0FJLFUsR0FBQUEsVTtRQUNBSSxRLEdBQUFBLFE7UUFDQUksUSxHQUFBQSxRO1FBQ0FFLE0sR0FBQUEsTTtRQUNBUSxVLEdBQUFBLFU7UUFDQUYsVSxHQUFBQSxVO1FBQ0FnQixPLEdBQUFBLE87UUFDQUcsUSxHQUFBQSxRIiwiZmlsZSI6ImhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9VSS9hc3NldHMvanNcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaGVscGVycy5qc1wiKTtcbiIsIi8vIFJvb3QgVVJMXG5jb25zdCByb290VXJsID0gXCJodHRwOi8vMTI3LjAuMC4xOjUwMDAvYXBpL3YxL1wiO1xuXG5leHBvcnQgeyByb290VXJsIH07XG4iLCJpbXBvcnQgeyByb290VXJsIH0gZnJvbSBcIi4vYXBwXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGUoZWxlbWVudCkge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kKHBhcmVudCwgZWwpIHtcbiAgcmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChlbCk7XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50KGVsZW1lbnQsIHZhbHVlKSB7XG4gIHJldHVybiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCkuaW5uZXJIVE1MID0gdmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0VG9rZW4oaWRUb2tlbikge1xuICAvLyBTYXZlcyB1c2VyIHRva2VuIHRvIGxvY2FsU3RvcmFnZVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImlkX3Rva2VuXCIsIGlkVG9rZW4pO1xuICByZXR1cm4gXCJUb2tlbiBTZXRcIjtcbn1cblxuZnVuY3Rpb24gZ2V0VG9rZW4oKSB7XG4gIC8vIFJldHJpZXZlcyB0aGUgdXNlciB0b2tlbiBmcm9tIGxvY2FsU3RvcmFnZVxuICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpZF90b2tlblwiKTtcbn1cblxuZnVuY3Rpb24gbG9nb3V0KCkge1xuICAvLyBDbGVhciB1c2VyIHRva2VuIGFuZCBwcm9maWxlIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJpZF90b2tlblwiKTtcbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJwcm9maWxlXCIpO1xufVxuLy8gZnVuY3Rpb24gbG9nZ2VkSW4oKSB7XG4vLyAgIC8vIENoZWNrcyBpZiB0aGVyZSBpcyBhIHNhdmVkIHRva2VuIGFuZCBpdCdzIHN0aWxsIHZhbGlkXG4vLyAgIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKTtcbi8vICAgcmV0dXJuIHRydWU7XG4vLyB9XG5mdW5jdGlvbiBzZXRQcm9maWxlKHByb2ZpbGUpIHtcbiAgLy8gU2F2ZXMgcHJvZmlsZSBkYXRhIHRvIGxvY2FsU3RvcmFnZVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2ZpbGVcIiwgSlNPTi5zdHJpbmdpZnkocHJvZmlsZSkpO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9maWxlKCkge1xuICAvLyBSZXRyaWV2ZXMgdGhlIHByb2ZpbGUgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxuICBjb25zdCBwcm9maWxlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9maWxlXCIpO1xuICByZXR1cm4gcHJvZmlsZSA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLnByb2ZpbGUpIDoge307XG59XG4vLyBDaGVjayBpZiB0b2tlbiBleGlzdHMgYW5kIG9yIHZhbGlkXG5mdW5jdGlvbiBjaGVja1Rva2VuKCkge1xuICByZXR1cm4gZmV0Y2gocm9vdFVybCArIFwiYXV0aC91c2VyXCIsIHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpZF90b2tlblwiKVxuICAgIH1cbiAgfSlcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMubXNnID09PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2ZpbGVcIiwgSlNPTi5zdHJpbmdpZnkocmVzLnJlc3VsdCkpO1xuICAgICAgICByZXR1cm4gXCJzdWNjZXNzXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkJhZCB0b2tlbiBvciBub3QgZXhpc3RcIik7XG4gICAgICAgIHJldHVybiBcImZhaWxcIjtcbiAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8vIENoZWNrIHVzZXIgbGV2ZWxcblxuZnVuY3Rpb24gaXNBZG1pbigpIHtcbiAgbGV0IHVzZXIgPSBnZXRQcm9maWxlKCk7XG4gIGlmICh1c2VyLnVzZXJfbGV2ZWwgPT0gXCJBZG1pblwiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmNvbnN0IHVybFBhcmFtID0gKG5hbWUsIHcpID0+IHtcbiAgdyA9IHcgfHwgd2luZG93O1xuICBsZXQgcnggPSBuZXcgUmVnRXhwKFwiWyZ8P11cIiArIG5hbWUgKyBcIj0oW14mI10rKVwiKSxcbiAgICB2YWwgPSB3LmxvY2F0aW9uLnNlYXJjaC5tYXRjaChyeCk7XG4gIHJldHVybiAhdmFsID8gXCJcIiA6IHZhbFsxXTtcbn07XG5leHBvcnQge1xuICBjcmVhdGVOb2RlLFxuICBhcHBlbmQsXG4gIGdldEVsZW1lbnQsXG4gIHNldFRva2VuLFxuICBnZXRUb2tlbixcbiAgbG9nb3V0LFxuICBjaGVja1Rva2VuLFxuICBnZXRQcm9maWxlLFxuICBpc0FkbWluLFxuICB1cmxQYXJhbVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=