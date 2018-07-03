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

window.location.href = "login.html";

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nb3V0LmpzIl0sIm5hbWVzIjpbInJvb3RVcmwiLCJjcmVhdGVOb2RlIiwiZWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZCIsInBhcmVudCIsImVsIiwiYXBwZW5kQ2hpbGQiLCJnZXRFbGVtZW50IiwidmFsdWUiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsInNldFRva2VuIiwiaWRUb2tlbiIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRUb2tlbiIsImdldEl0ZW0iLCJsb2dvdXQiLCJyZW1vdmVJdGVtIiwic2V0UHJvZmlsZSIsInByb2ZpbGUiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0UHJvZmlsZSIsInBhcnNlIiwiY2hlY2tUb2tlbiIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJ0aGVuIiwicmVzIiwianNvbiIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsImVyciIsIm1zZyIsInJlc3VsdCIsImlzQWRtaW4iLCJ1c2VyIiwidXNlcl9sZXZlbCIsInVybFBhcmFtIiwibmFtZSIsInciLCJ3aW5kb3ciLCJyeCIsIlJlZ0V4cCIsInZhbCIsImxvY2F0aW9uIiwic2VhcmNoIiwibWF0Y2giLCJocmVmIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Es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V0FBTyxJQUFQO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsV0FBTyxLQUFQO0FBQ0Q7QUFDRjs7QUFFRCxJQUFNQyxXQUFXLFNBQVhBLFFBQVcsQ0FBQ0MsSUFBRCxFQUFPQyxDQUFQLEVBQWE7QUFDNUJBLE1BQUlBLEtBQUtDLE1BQVQ7QUFDQSxNQUFJQyxLQUFLLElBQUlDLE1BQUosQ0FBVyxVQUFVSixJQUFWLEdBQWlCLFdBQTVCLENBQVQ7QUFBQSxNQUNFSyxNQUFNSixFQUFFSyxRQUFGLENBQVdDLE1BQVgsQ0FBa0JDLEtBQWxCLENBQXdCTCxFQUF4QixDQURSO0FBRUEsU0FBTyxDQUFDRSxHQUFELEdBQU8sRUFBUCxHQUFZQSxJQUFJLENBQUosQ0FBbkI7QUFDRCxDQUxEO1FBT0VqRCxVLEdBQUFBLFU7UUFDQUksTSxHQUFBQSxNO1FBQ0FJLFUsR0FBQUEsVTtRQUNBSSxRLEdBQUFBLFE7UUFDQUksUSxHQUFBQSxRO1FBQ0FFLE0sR0FBQUEsTTtRQUNBUSxVLEdBQUFBLFU7UUFDQUYsVSxHQUFBQSxVO1FBQ0FnQixPLEdBQUFBLE87UUFDQUcsUSxHQUFBQSxROzs7Ozs7Ozs7Ozs7OztBQzNGRjs7QUFFQTs7QUFFQUcsT0FBT0ksUUFBUCxDQUFnQkcsSUFBaEIsR0FBdUIsWUFBdkIsQyIsImZpbGUiOiJsb2dvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9VSS9hc3NldHMvanNcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbG9nb3V0LmpzXCIpO1xuIiwiLy8gUm9vdCBVUkxcbmNvbnN0IHJvb3RVcmwgPSBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMC9hcGkvdjEvXCI7XG5cbmV4cG9ydCB7IHJvb3RVcmwgfTtcbiIsImltcG9ydCB7IHJvb3RVcmwgfSBmcm9tIFwiLi9hcHBcIjtcblxuZnVuY3Rpb24gY3JlYXRlTm9kZShlbGVtZW50KSB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBhcHBlbmQocGFyZW50LCBlbCkge1xuICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGVsKTtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnQoZWxlbWVudCwgdmFsdWUpIHtcbiAgcmV0dXJuIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KS5pbm5lckhUTUwgPSB2YWx1ZSk7XG59XG5mdW5jdGlvbiBzZXRUb2tlbihpZFRva2VuKSB7XG4gIC8vIFNhdmVzIHVzZXIgdG9rZW4gdG8gbG9jYWxTdG9yYWdlXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaWRfdG9rZW5cIiwgaWRUb2tlbik7XG4gIHJldHVybiBcIlRva2VuIFNldFwiO1xufVxuXG5mdW5jdGlvbiBnZXRUb2tlbigpIHtcbiAgLy8gUmV0cmlldmVzIHRoZSB1c2VyIHRva2VuIGZyb20gbG9jYWxTdG9yYWdlXG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlkX3Rva2VuXCIpO1xufVxuXG5mdW5jdGlvbiBsb2dvdXQoKSB7XG4gIC8vIENsZWFyIHVzZXIgdG9rZW4gYW5kIHByb2ZpbGUgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxuICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImlkX3Rva2VuXCIpO1xuICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInByb2ZpbGVcIik7XG59XG4vLyBmdW5jdGlvbiBsb2dnZWRJbigpIHtcbi8vICAgLy8gQ2hlY2tzIGlmIHRoZXJlIGlzIGEgc2F2ZWQgdG9rZW4gYW5kIGl0J3Mgc3RpbGwgdmFsaWRcbi8vICAgY29uc3QgdG9rZW4gPSBnZXRUb2tlbigpO1xuLy8gICByZXR1cm4gdHJ1ZTtcbi8vIH1cbmZ1bmN0aW9uIHNldFByb2ZpbGUocHJvZmlsZSkge1xuICAvLyBTYXZlcyBwcm9maWxlIGRhdGEgdG8gbG9jYWxTdG9yYWdlXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvZmlsZVwiLCBKU09OLnN0cmluZ2lmeShwcm9maWxlKSk7XG59XG5cbmZ1bmN0aW9uIGdldFByb2ZpbGUoKSB7XG4gIC8vIFJldHJpZXZlcyB0aGUgcHJvZmlsZSBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXG4gIGNvbnN0IHByb2ZpbGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2ZpbGVcIik7XG4gIHJldHVybiBwcm9maWxlID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UucHJvZmlsZSkgOiB7fTtcbn1cbi8vIENoZWNrIGlmIHRva2VuIGV4aXN0cyBhbmQgb3IgdmFsaWRcbmZ1bmN0aW9uIGNoZWNrVG9rZW4oKSB7XG4gIHJldHVybiBmZXRjaChyb290VXJsICsgXCJhdXRoL3VzZXJcIiwge1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlkX3Rva2VuXCIpXG4gICAgfVxuICB9KVxuICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5tc2cgPT09IFwic3VjY2Vzc1wiKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvZmlsZVwiLCBKU09OLnN0cmluZ2lmeShyZXMucmVzdWx0KSk7XG4gICAgICAgIHJldHVybiBcInN1Y2Nlc3NcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmFkIHRva2VuIG9yIG5vdCBleGlzdFwiKTtcbiAgICAgICAgcmV0dXJuIFwiZmFpbFwiO1xuICAgICAgfVxuICAgIH0pO1xufVxuXG4vLy8gQ2hlY2sgdXNlciBsZXZlbFxuXG5mdW5jdGlvbiBpc0FkbWluKCkge1xuICBsZXQgdXNlciA9IGdldFByb2ZpbGUoKTtcbiAgaWYgKHVzZXIudXNlcl9sZXZlbCA9PSBcIkFkbWluXCIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuY29uc3QgdXJsUGFyYW0gPSAobmFtZSwgdykgPT4ge1xuICB3ID0gdyB8fCB3aW5kb3c7XG4gIGxldCByeCA9IG5ldyBSZWdFeHAoXCJbJnw/XVwiICsgbmFtZSArIFwiPShbXiYjXSspXCIpLFxuICAgIHZhbCA9IHcubG9jYXRpb24uc2VhcmNoLm1hdGNoKHJ4KTtcbiAgcmV0dXJuICF2YWwgPyBcIlwiIDogdmFsWzFdO1xufTtcbmV4cG9ydCB7XG4gIGNyZWF0ZU5vZGUsXG4gIGFwcGVuZCxcbiAgZ2V0RWxlbWVudCxcbiAgc2V0VG9rZW4sXG4gIGdldFRva2VuLFxuICBsb2dvdXQsXG4gIGNoZWNrVG9rZW4sXG4gIGdldFByb2ZpbGUsXG4gIGlzQWRtaW4sXG4gIHVybFBhcmFtXG59O1xuIiwiaW1wb3J0IHsgbG9nb3V0IH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG5sb2dvdXQoKTtcblxud2luZG93LmxvY2F0aW9uLmhyZWYgPSBcImxvZ2luLmh0bWxcIjtcbiJdLCJzb3VyY2VSb290IjoiIn0=