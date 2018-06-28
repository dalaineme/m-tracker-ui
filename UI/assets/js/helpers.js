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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyJdLCJuYW1lcyI6WyJyb290VXJsIiwiY3JlYXRlTm9kZSIsImVsZW1lbnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmQiLCJwYXJlbnQiLCJlbCIsImFwcGVuZENoaWxkIiwiZ2V0RWxlbWVudCIsInZhbHVlIiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJzZXRUb2tlbiIsImlkVG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0VG9rZW4iLCJnZXRJdGVtIiwibG9nb3V0IiwicmVtb3ZlSXRlbSIsImxvZ2dlZEluIiwidG9rZW4iLCJzZXRQcm9maWxlIiwicHJvZmlsZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRQcm9maWxlIiwicGFyc2UiLCJjaGVja1Rva2VuIiwicmVkaXJlY3RUbyIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJ0aGVuIiwicmVzIiwianNvbiIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsImVyciIsInN0YXR1cyIsInJlc3VsdCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QSxVO1FBQ0FGLFUsR0FBQUEsVSIsImZpbGUiOiJoZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvVUkvYXNzZXRzL2pzXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2hlbHBlcnMuanNcIik7XG4iLCIvLyBSb290IFVSTFxuY29uc3Qgcm9vdFVybCA9IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAwL2FwaS92MS9cIjtcblxuZXhwb3J0IHsgcm9vdFVybCB9O1xuIiwiaW1wb3J0IHsgcm9vdFVybCB9IGZyb20gXCIuL2FwcFwiO1xuXG5mdW5jdGlvbiBjcmVhdGVOb2RlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZChwYXJlbnQsIGVsKSB7XG4gIHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xufVxuZnVuY3Rpb24gZ2V0RWxlbWVudChlbGVtZW50LCB2YWx1ZSkge1xuICByZXR1cm4gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpLmlubmVySFRNTCA9IHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHNldFRva2VuKGlkVG9rZW4pIHtcbiAgLy8gU2F2ZXMgdXNlciB0b2tlbiB0byBsb2NhbFN0b3JhZ2VcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpZF90b2tlblwiLCBpZFRva2VuKTtcbn1cblxuZnVuY3Rpb24gZ2V0VG9rZW4oKSB7XG4gIC8vIFJldHJpZXZlcyB0aGUgdXNlciB0b2tlbiBmcm9tIGxvY2FsU3RvcmFnZVxuICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpZF90b2tlblwiKTtcbn1cblxuZnVuY3Rpb24gbG9nb3V0KCkge1xuICAvLyBDbGVhciB1c2VyIHRva2VuIGFuZCBwcm9maWxlIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJpZF90b2tlblwiKTtcbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJwcm9maWxlXCIpO1xufVxuZnVuY3Rpb24gbG9nZ2VkSW4oKSB7XG4gIC8vIENoZWNrcyBpZiB0aGVyZSBpcyBhIHNhdmVkIHRva2VuIGFuZCBpdCdzIHN0aWxsIHZhbGlkXG4gIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgcmV0dXJuIHRva2VuO1xufVxuZnVuY3Rpb24gc2V0UHJvZmlsZShwcm9maWxlKSB7XG4gIC8vIFNhdmVzIHByb2ZpbGUgZGF0YSB0byBsb2NhbFN0b3JhZ2VcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9maWxlXCIsIEpTT04uc3RyaW5naWZ5KHByb2ZpbGUpKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvZmlsZSgpIHtcbiAgLy8gUmV0cmlldmVzIHRoZSBwcm9maWxlIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgY29uc3QgcHJvZmlsZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvZmlsZVwiKTtcbiAgcmV0dXJuIHByb2ZpbGUgPyBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5wcm9maWxlKSA6IHt9O1xufVxuZnVuY3Rpb24gY2hlY2tUb2tlbihyZWRpcmVjdFRvKSB7XG4gIGlmIChsb2dnZWRJbigpKSB7XG4gICAgZmV0Y2gocm9vdFVybCArIFwiYXV0aC91c2VyXCIsIHtcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogbG9nZ2VkSW4oKVxuICAgICAgfVxuICAgIH0pXG4gICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzID09PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICAgIHNldFByb2ZpbGUocmVzLnJlc3VsdCk7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdFRvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFkIHRva2VuIG9yIG5vdCBleGlzdFwiKTtcbiAgICAgICAgICByZXR1cm4gXCJiYWQgdG9rZW5cIjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coXCJObyB0b2tlblwiKTtcbiAgfVxufVxuZXhwb3J0IHtcbiAgY3JlYXRlTm9kZSxcbiAgYXBwZW5kLFxuICBnZXRFbGVtZW50LFxuICBzZXRUb2tlbixcbiAgZ2V0VG9rZW4sXG4gIGxvZ291dCxcbiAgbG9nZ2VkSW4sXG4gIGNoZWNrVG9rZW4sXG4gIGdldFByb2ZpbGVcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9