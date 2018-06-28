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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/logout.js");
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
exports.getProfile = exports.checkToken = exports.loggedIn = exports.logout = exports.getToken = exports.setToken = exports.getElement = exports.append = exports.createNode = undefined;

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
  var token = getToken();
  return token;
}
function setProfile(profile) {
  // Saves profile data to localStorage
  localStorage.setItem("profile", JSON.stringify(profile));
}

function getProfile() {
  // Retrieves the profile data from localStorage
  var profile = localStorage.getItem("profile");
  return profile ? JSON.parse(localStorage.profile) : {};
}
function checkToken(redirectTo) {
  if (loggedIn()) {
    fetch(_app.rootUrl + "auth/user", {
      method: "GET",
      headers: {
        Authorization: loggedIn()
      }
    }).then(function (res) {
      return res.json();
    }).catch(function (err) {
      return console.log(err);
    }).then(function (res) {
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
exports.createNode = createNode;
exports.append = append;
exports.getElement = getElement;
exports.setToken = setToken;
exports.getToken = getToken;
exports.logout = logout;
exports.loggedIn = loggedIn;
exports.checkToken = checkToken;
exports.getProfile = getProfile;

/***/ }),

/***/ "./src/logout.js":
/*!***********************!*\
  !*** ./src/logout.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _helpers = __webpack_require__(/*! ./helpers */ "./src/helpers.js");

(0, _helpers.logout)();

window.location.href = "../login.html";

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nb3V0LmpzIl0sIm5hbWVzIjpbInJvb3RVcmwiLCJjcmVhdGVOb2RlIiwiZWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZCIsInBhcmVudCIsImVsIiwiYXBwZW5kQ2hpbGQiLCJnZXRFbGVtZW50IiwidmFsdWUiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsInNldFRva2VuIiwiaWRUb2tlbiIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRUb2tlbiIsImdldEl0ZW0iLCJsb2dvdXQiLCJyZW1vdmVJdGVtIiwibG9nZ2VkSW4iLCJ0b2tlbiIsInNldFByb2ZpbGUiLCJwcm9maWxlIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFByb2ZpbGUiLCJwYXJzZSIsImNoZWNrVG9rZW4iLCJyZWRpcmVjdFRvIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsInRoZW4iLCJyZXMiLCJqc29uIiwiY2F0Y2giLCJjb25zb2xlIiwibG9nIiwiZXJyIiwic3RhdHVzIiwicmVzdWx0Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7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O1FBQ0FFLFEsR0FBQUEsUTtRQUNBUSxVLEdBQUFBLFU7UUFDQUYsVSxHQUFBQSxVOzs7Ozs7Ozs7Ozs7OztBQzFFRjs7QUFFQTs7QUFFQWlCLE9BQU9DLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLGVBQXZCLEMiLCJmaWxlIjoibG9nb3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvVUkvYXNzZXRzL2pzXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2xvZ291dC5qc1wiKTtcbiIsIi8vIFJvb3QgVVJMXG5jb25zdCByb290VXJsID0gXCJodHRwOi8vMTI3LjAuMC4xOjUwMDAvYXBpL3YxL1wiO1xuXG5leHBvcnQgeyByb290VXJsIH07XG4iLCJpbXBvcnQgeyByb290VXJsIH0gZnJvbSBcIi4vYXBwXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGUoZWxlbWVudCkge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kKHBhcmVudCwgZWwpIHtcbiAgcmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChlbCk7XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50KGVsZW1lbnQsIHZhbHVlKSB7XG4gIHJldHVybiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCkuaW5uZXJIVE1MID0gdmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0VG9rZW4oaWRUb2tlbikge1xuICAvLyBTYXZlcyB1c2VyIHRva2VuIHRvIGxvY2FsU3RvcmFnZVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImlkX3Rva2VuXCIsIGlkVG9rZW4pO1xufVxuXG5mdW5jdGlvbiBnZXRUb2tlbigpIHtcbiAgLy8gUmV0cmlldmVzIHRoZSB1c2VyIHRva2VuIGZyb20gbG9jYWxTdG9yYWdlXG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlkX3Rva2VuXCIpO1xufVxuXG5mdW5jdGlvbiBsb2dvdXQoKSB7XG4gIC8vIENsZWFyIHVzZXIgdG9rZW4gYW5kIHByb2ZpbGUgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxuICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImlkX3Rva2VuXCIpO1xuICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInByb2ZpbGVcIik7XG59XG5mdW5jdGlvbiBsb2dnZWRJbigpIHtcbiAgLy8gQ2hlY2tzIGlmIHRoZXJlIGlzIGEgc2F2ZWQgdG9rZW4gYW5kIGl0J3Mgc3RpbGwgdmFsaWRcbiAgY29uc3QgdG9rZW4gPSBnZXRUb2tlbigpO1xuICByZXR1cm4gdG9rZW47XG59XG5mdW5jdGlvbiBzZXRQcm9maWxlKHByb2ZpbGUpIHtcbiAgLy8gU2F2ZXMgcHJvZmlsZSBkYXRhIHRvIGxvY2FsU3RvcmFnZVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2ZpbGVcIiwgSlNPTi5zdHJpbmdpZnkocHJvZmlsZSkpO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9maWxlKCkge1xuICAvLyBSZXRyaWV2ZXMgdGhlIHByb2ZpbGUgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxuICBjb25zdCBwcm9maWxlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9maWxlXCIpO1xuICByZXR1cm4gcHJvZmlsZSA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLnByb2ZpbGUpIDoge307XG59XG5mdW5jdGlvbiBjaGVja1Rva2VuKHJlZGlyZWN0VG8pIHtcbiAgaWYgKGxvZ2dlZEluKCkpIHtcbiAgICBmZXRjaChyb290VXJsICsgXCJhdXRoL3VzZXJcIiwge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBsb2dnZWRJbigpXG4gICAgICB9XG4gICAgfSlcbiAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IFwic3VjY2Vzc1wiKSB7XG4gICAgICAgICAgc2V0UHJvZmlsZShyZXMucmVzdWx0KTtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0VG87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJCYWQgdG9rZW4gb3Igbm90IGV4aXN0XCIpO1xuICAgICAgICAgIHJldHVybiBcImJhZCB0b2tlblwiO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcIk5vIHRva2VuXCIpO1xuICB9XG59XG5leHBvcnQge1xuICBjcmVhdGVOb2RlLFxuICBhcHBlbmQsXG4gIGdldEVsZW1lbnQsXG4gIHNldFRva2VuLFxuICBnZXRUb2tlbixcbiAgbG9nb3V0LFxuICBsb2dnZWRJbixcbiAgY2hlY2tUb2tlbixcbiAgZ2V0UHJvZmlsZVxufTtcbiIsImltcG9ydCB7IGxvZ291dCB9IGZyb20gXCIuL2hlbHBlcnNcIjtcblxubG9nb3V0KCk7XG5cbndpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuLi9sb2dpbi5odG1sXCI7XG4iXSwic291cmNlUm9vdCI6IiJ9