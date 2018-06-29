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
exports.isAdmin = exports.getProfile = exports.checkToken = exports.logout = exports.getToken = exports.setToken = exports.getElement = exports.append = exports.createNode = undefined;

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
  fetch(_app.rootUrl + "auth/user", {
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
      console.log("Valid Token");
      return "valid token";
    } else {
      console.log("Bad token or not exist");
      return "fail";
    }
  });
}
function isAdmin() {
  var user = getProfile();
  console.log(getProfile());
  if (user.user_level == "Admin") {
    return true;
  } else {
    return false;
  }
}
exports.createNode = createNode;
exports.append = append;
exports.getElement = getElement;
exports.setToken = setToken;
exports.getToken = getToken;
exports.logout = logout;
exports.checkToken = checkToken;
exports.getProfile = getProfile;
exports.isAdmin = isAdmin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nb3V0LmpzIl0sIm5hbWVzIjpbInJvb3RVcmwiLCJjcmVhdGVOb2RlIiwiZWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZCIsInBhcmVudCIsImVsIiwiYXBwZW5kQ2hpbGQiLCJnZXRFbGVtZW50IiwidmFsdWUiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsInNldFRva2VuIiwiaWRUb2tlbiIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRUb2tlbiIsImdldEl0ZW0iLCJsb2dvdXQiLCJyZW1vdmVJdGVtIiwic2V0UHJvZmlsZSIsInByb2ZpbGUiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0UHJvZmlsZSIsInBhcnNlIiwiY2hlY2tUb2tlbiIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJ0aGVuIiwicmVzIiwianNvbiIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsImVyciIsIm1zZyIsInJlc3VsdCIsImlzQWRtaW4iLCJ1c2VyIiwidXNlcl9sZXZlbCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0EsSUFBTUEsVUFBVSwrQkFBaEI7O1FBRVNBLE8sR0FBQUEsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hUOztBQUVBLFNBQVNDLFVBQVQsQ0FBb0JDLE9BQXBCLEVBQTZCO0FBQzNCLFNBQU9DLFNBQVNDLGFBQVQsQ0FBdUJGLE9BQXZCLENBQVA7QUFDRDs7QUFFRCxTQUFTRyxNQUFULENBQWdCQyxNQUFoQixFQUF3QkMsRUFBeEIsRUFBNEI7QUFDMUIsU0FBT0QsT0FBT0UsV0FBUCxDQUFtQkQsRUFBbkIsQ0FBUDtBQUNEO0FBQ0QsU0FBU0UsVUFBVCxDQUFvQlAsT0FBcEIsRUFBNkJRLEtBQTdCLEVBQW9DO0FBQ2xDLFNBQVFQLFNBQVNRLGNBQVQsQ0FBd0JULE9BQXhCLEVBQWlDVSxTQUFqQyxHQUE2Q0YsS0FBckQ7QUFDRDtBQUNELFNBQVNHLFFBQVQsQ0FBa0JDLE9BQWxCLEVBQTJCO0FBQ3pCO0FBQ0FDLGVBQWFDLE9BQWIsQ0FBcUIsVUFBckIsRUFBaUNGLE9BQWpDO0FBQ0EsU0FBTyxXQUFQO0FBQ0Q7O0FBRUQsU0FBU0csUUFBVCxHQUFvQjtBQUNsQjtBQUNBLFNBQU9GLGFBQWFHLE9BQWIsQ0FBcUIsVUFBckIsQ0FBUDtBQUNEOztBQUVELFNBQVNDLE1BQVQsR0FBa0I7QUFDaEI7QUFDQUosZUFBYUssVUFBYixDQUF3QixVQUF4QjtBQUNBTCxlQUFhSyxVQUFiLENBQXdCLFNBQXhCO0FBQ0Q7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU0MsVUFBVCxDQUFvQkMsT0FBcEIsRUFBNkI7QUFDM0I7QUFDQVAsZUFBYUMsT0FBYixDQUFxQixTQUFyQixFQUFnQ08sS0FBS0MsU0FBTCxDQUFlRixPQUFmLENBQWhDO0FBQ0Q7O0FBRUQsU0FBU0csVUFBVCxHQUFzQjtBQUNwQjtBQUNBLE1BQU1ILFVBQVVQLGFBQWFHLE9BQWIsQ0FBcUIsU0FBckIsQ0FBaEI7QUFDQSxTQUFPSSxVQUFVQyxLQUFLRyxLQUFMLENBQVdYLGFBQWFPLE9BQXhCLENBQVYsR0FBNkMsRUFBcEQ7QUFDRDtBQUNEO0FBQ0EsU0FBU0ssVUFBVCxHQUFzQjtBQUNwQkMsUUFBTTVCLGVBQVUsV0FBaEIsRUFBNkI7QUFDM0I2QixZQUFRLEtBRG1CO0FBRTNCQyxhQUFTO0FBQ1BDLHFCQUFlaEIsYUFBYUcsT0FBYixDQUFxQixVQUFyQjtBQURSO0FBRmtCLEdBQTdCLEVBTUdjLElBTkgsQ0FNUTtBQUFBLFdBQU9DLElBQUlDLElBQUosRUFBUDtBQUFBLEdBTlIsRUFPR0MsS0FQSCxDQU9TO0FBQUEsV0FBT0MsUUFBUUMsR0FBUixDQUFZQyxHQUFaLENBQVA7QUFBQSxHQVBULEVBUUdOLElBUkgsQ0FRUSxlQUFPO0FBQ1gsUUFBSUMsSUFBSU0sR0FBSixLQUFZLFNBQWhCLEVBQTJCO0FBQ3pCeEIsbUJBQWFDLE9BQWIsQ0FBcUIsU0FBckIsRUFBZ0NPLEtBQUtDLFNBQUwsQ0FBZVMsSUFBSU8sTUFBbkIsQ0FBaEM7QUFDQUosY0FBUUMsR0FBUixDQUFZLGFBQVo7QUFDQSxhQUFPLGFBQVA7QUFDRCxLQUpELE1BSU87QUFDTEQsY0FBUUMsR0FBUixDQUFZLHdCQUFaO0FBQ0EsYUFBTyxNQUFQO0FBQ0Q7QUFDRixHQWpCSDtBQWtCRDtBQUNELFNBQVNJLE9BQVQsR0FBbUI7QUFDakIsTUFBSUMsT0FBT2pCLFlBQVg7QUFDQVcsVUFBUUMsR0FBUixDQUFZWixZQUFaO0FBQ0EsTUFBSWlCLEtBQUtDLFVBQUwsSUFBbUIsT0FBdkIsRUFBZ0M7QUFDOUIsV0FBTyxJQUFQO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsV0FBTyxLQUFQO0FBQ0Q7QUFDRjtRQUVDMUMsVSxHQUFBQSxVO1FBQ0FJLE0sR0FBQUEsTTtRQUNBSSxVLEdBQUFBLFU7UUFDQUksUSxHQUFBQSxRO1FBQ0FJLFEsR0FBQUEsUTtRQUNBRSxNLEdBQUFBLE07UUFDQVEsVSxHQUFBQSxVO1FBQ0FGLFUsR0FBQUEsVTtRQUNBZ0IsTyxHQUFBQSxPOzs7Ozs7Ozs7Ozs7OztBQ2xGRjs7QUFFQTs7QUFFQUcsT0FBT0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIsWUFBdkIsQyIsImZpbGUiOiJsb2dvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9VSS9hc3NldHMvanNcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbG9nb3V0LmpzXCIpO1xuIiwiLy8gUm9vdCBVUkxcbmNvbnN0IHJvb3RVcmwgPSBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMC9hcGkvdjEvXCI7XG5cbmV4cG9ydCB7IHJvb3RVcmwgfTtcbiIsImltcG9ydCB7IHJvb3RVcmwgfSBmcm9tIFwiLi9hcHBcIjtcblxuZnVuY3Rpb24gY3JlYXRlTm9kZShlbGVtZW50KSB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBhcHBlbmQocGFyZW50LCBlbCkge1xuICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGVsKTtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnQoZWxlbWVudCwgdmFsdWUpIHtcbiAgcmV0dXJuIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KS5pbm5lckhUTUwgPSB2YWx1ZSk7XG59XG5mdW5jdGlvbiBzZXRUb2tlbihpZFRva2VuKSB7XG4gIC8vIFNhdmVzIHVzZXIgdG9rZW4gdG8gbG9jYWxTdG9yYWdlXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaWRfdG9rZW5cIiwgaWRUb2tlbik7XG4gIHJldHVybiBcIlRva2VuIFNldFwiO1xufVxuXG5mdW5jdGlvbiBnZXRUb2tlbigpIHtcbiAgLy8gUmV0cmlldmVzIHRoZSB1c2VyIHRva2VuIGZyb20gbG9jYWxTdG9yYWdlXG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlkX3Rva2VuXCIpO1xufVxuXG5mdW5jdGlvbiBsb2dvdXQoKSB7XG4gIC8vIENsZWFyIHVzZXIgdG9rZW4gYW5kIHByb2ZpbGUgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxuICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImlkX3Rva2VuXCIpO1xuICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInByb2ZpbGVcIik7XG59XG4vLyBmdW5jdGlvbiBsb2dnZWRJbigpIHtcbi8vICAgLy8gQ2hlY2tzIGlmIHRoZXJlIGlzIGEgc2F2ZWQgdG9rZW4gYW5kIGl0J3Mgc3RpbGwgdmFsaWRcbi8vICAgY29uc3QgdG9rZW4gPSBnZXRUb2tlbigpO1xuLy8gICByZXR1cm4gdHJ1ZTtcbi8vIH1cbmZ1bmN0aW9uIHNldFByb2ZpbGUocHJvZmlsZSkge1xuICAvLyBTYXZlcyBwcm9maWxlIGRhdGEgdG8gbG9jYWxTdG9yYWdlXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvZmlsZVwiLCBKU09OLnN0cmluZ2lmeShwcm9maWxlKSk7XG59XG5cbmZ1bmN0aW9uIGdldFByb2ZpbGUoKSB7XG4gIC8vIFJldHJpZXZlcyB0aGUgcHJvZmlsZSBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXG4gIGNvbnN0IHByb2ZpbGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2ZpbGVcIik7XG4gIHJldHVybiBwcm9maWxlID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UucHJvZmlsZSkgOiB7fTtcbn1cbi8vIENoZWNrIGlmIHRva2VuIGV4aXN0cyBhbmQgb3IgdmFsaWRcbmZ1bmN0aW9uIGNoZWNrVG9rZW4oKSB7XG4gIGZldGNoKHJvb3RVcmwgKyBcImF1dGgvdXNlclwiLCB7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaWRfdG9rZW5cIilcbiAgICB9XG4gIH0pXG4gICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBpZiAocmVzLm1zZyA9PT0gXCJzdWNjZXNzXCIpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9maWxlXCIsIEpTT04uc3RyaW5naWZ5KHJlcy5yZXN1bHQpKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYWxpZCBUb2tlblwiKTtcbiAgICAgICAgcmV0dXJuIFwidmFsaWQgdG9rZW5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmFkIHRva2VuIG9yIG5vdCBleGlzdFwiKTtcbiAgICAgICAgcmV0dXJuIFwiZmFpbFwiO1xuICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gaXNBZG1pbigpIHtcbiAgbGV0IHVzZXIgPSBnZXRQcm9maWxlKCk7XG4gIGNvbnNvbGUubG9nKGdldFByb2ZpbGUoKSk7XG4gIGlmICh1c2VyLnVzZXJfbGV2ZWwgPT0gXCJBZG1pblwiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5leHBvcnQge1xuICBjcmVhdGVOb2RlLFxuICBhcHBlbmQsXG4gIGdldEVsZW1lbnQsXG4gIHNldFRva2VuLFxuICBnZXRUb2tlbixcbiAgbG9nb3V0LFxuICBjaGVja1Rva2VuLFxuICBnZXRQcm9maWxlLFxuICBpc0FkbWluXG59O1xuIiwiaW1wb3J0IHsgbG9nb3V0IH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG5sb2dvdXQoKTtcblxud2luZG93LmxvY2F0aW9uLmhyZWYgPSBcImxvZ2luLmh0bWxcIjtcbiJdLCJzb3VyY2VSb290IjoiIn0=