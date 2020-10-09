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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let postUrl = \"https://jsonplaceholder.typicode.com/posts/\";   \r\nconst containerCards = document.getElementById(\"cards-holder\");\r\nconst Remover = document.getElementById(\"remover\");\r\nconst closeX = document.getElementsByClassName(\"close\");\r\nconst hamburger_menu = document.getElementsByClassName(\"hamburger-menu\");\r\nconst hamburger_button = document.getElementsByClassName(\"hamburgerbutton\");\r\nconst post = document.querySelectorAll('[data-sku]');\r\nlet init = {\r\n         method: 'GET'\r\n     }\r\n\r\n     //funzioni\r\n  hamburger_button[0].addEventListener(\"click\", () => {\r\n  hamburger_menu[0].classList.add(\"active\");\r\n})\r\ncloseX[0].addEventListener(\"click\",  () => {\r\n  hamburger_menu[0].classList.remove(\"active\");\r\n})\r\n\r\n//al click su remove card elimino tutte le card presenti \r\nRemover.addEventListener(\"click\", (e) =>  {\r\n  e.preventDefault;\r\n  \r\n while (containerCards.hasChildNodes()) {\r\n    containerCards.removeChild(containerCards.childNodes[0]);\r\n    const postParents = document.querySelectorAll(`[data-sku]`);\r\n    postParents.forEach((post) => post.classList.remove(\"clicked\"));\r\n  }\r\n})\r\n\r\n     //fetch ritorna una promise\r\n async function getPosts(id) {\r\n      const callPost = await fetch(postUrl + id, init)\r\n        .then((result) => result.json())\r\n        .catch((err) => {\r\n          console.log(err);\r\n        });\r\n      return callPost;\r\n    } \r\n\r\n\r\n    class Card{\r\n\r\n      constructor(id,title,body){\r\n        this.id= id;\r\n        this.title= title;\r\n        this.body = body;\r\n      }\r\n\r\n\r\n        createCardHTML() {\r\n    \r\n        return ` <div class=\"card\" id=${this.id}>\r\n              <div class=\"card-content\">\r\n                <div class=\"content\">\r\n                  <div class=\"title\"> <h1>${this.title}</h1> </div>\r\n                  <div class=\"body\"> <h2>${this.body} </h2> </div>\r\n                </div>\r\n              </div>\r\n            </div>`\r\n      }\r\n\r\n    }\r\n\r\n//funzione principale\r\nfunction getPost() {\r\n  post.forEach((elem) => {\r\n    elem.addEventListener(\"click\", (e) => {\r\n      let attribute = e.target.attributes[1].value;\r\n\r\n      \r\n\r\n      if (e.target.classList.contains(\"clicked\")) {\r\n        alert(\"già cliccato\");\r\n      } else {\r\n        e.target.classList.add(\"clicked\");\r\n\r\n        let res = getPosts(+attribute);\r\n        res.then((result) => {\r\n          //destrutturo i dati \r\n          console.log(result);\r\n          var {id,title,body} = result;\r\n\r\n          const postParent = document.querySelectorAll(`[data-sku=\"${id}\"]`);\r\n          var myCard = new Card(id,title,body);\r\n\r\n          var card = document.createElement(\"div\");\r\n          card.innerHTML= myCard.createCardHTML();\r\n          var button = document.createElement(\"button\");\r\n          button.classList.add(\"delete\");\r\n          button.textContent = \"REMOVE\";\r\n          card.appendChild(button);\r\n\r\n          button.addEventListener(\"click\", (e) => {\r\n\r\n                    let cardDeleted = document.getElementById(id);\r\n                    cardDeleted.remove();\r\n                    e.target.remove();\r\n                    console.log(\"il post è\",postParent);\r\n                   postParent.forEach(elem => elem.classList.remove(\"clicked\"))\r\n                })\r\n          containerCards.appendChild(card);\r\n        });\r\n      }\r\n    });\r\n  });\r\n}\r\n\r\n\r\n\r\ndocument.addEventListener(\"load\", getPost());\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });