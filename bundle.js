/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background: white;\n}\n\nul {\n  list-style-type: none;\n}\n\nli {\n  margin-bottom: 10%;\n}\n\nform {\n  width: 35rem;\n  margin: auto;\n  border: gray solid 3px;\n}\n\nlabel,\ninput,\nselect {\n  flex: 2 50%;\n  flex-grow: 2;\n}\n\ninput,\nselect {\n  margin: 10px 0;\n  padding: 15px 18px;\n  box-sizing: border-box;\n}\n\ninput,\nbutton {\n  max-width: 50%;\n  border-radius: 5px;\n}\n\nbutton {\n  background-color: darkblue;\n  color: white;\n  padding: 10px 20px;\n  margin: 30px 0;\n  font-size: 18px;\n}\n\nbutton:hover {\n  opacity: 0.6;\n  cursor: pointer;\n}\n\n.single,\n.form-header,\n.estimated-trip-cost,\nbutton {\n  flex: 1 100%;\n}\n\n.triple,\n.total-spend,\n.form-header,\n.estimated-trip-cost,\nbutton,\nform,\nh1,\nh2 {\n  text-align: center;\n}\n\n.form-header,\n.estimated-trip-cost,\nbutton {\n  font-weight: bold;\n  margin-bottom: 20px;\n}\n\n.login-instructions {\n  padding-top: 50px;\n  padding-bottom: 25px;\n}\n\n.error-message {\n  color: red;\n}\n\n.dashboard {\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-around;\n}\n\n.triple {\n  flex: 3;\n}\n\n.trips-list {\n  padding: 3%;\n}\n\n.trip-details {\n  margin-top: 1%;\n}\n\n.create-trip-request {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: baseline;\n  align-content: space-around;\n  align-self: flex-end;\n  justify-content: space-around;\n  text-align: left;\n  max-width: 100%;\n  padding: 1% 10%;\n}\n\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,iBAAiB;AACnB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,sBAAsB;AACxB;;AAEA;;;EAGE,WAAW;EACX,YAAY;AACd;;AAEA;;EAEE,cAAc;EACd,kBAAkB;EAClB,sBAAsB;AACxB;;AAEA;;EAEE,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,0BAA0B;EAC1B,YAAY;EACZ,kBAAkB;EAClB,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,eAAe;AACjB;;AAEA;;;;EAIE,YAAY;AACd;;AAEA;;;;;;;;EAQE,kBAAkB;AACpB;;AAEA;;;EAGE,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,oBAAoB;AACtB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;AAC/B;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,qBAAqB;EACrB,2BAA2B;EAC3B,oBAAoB;EACpB,6BAA6B;EAC7B,gBAAgB;EAChB,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,aAAa;AACf","sourcesContent":["body {\n  background: white;\n}\n\nul {\n  list-style-type: none;\n}\n\nli {\n  margin-bottom: 10%;\n}\n\nform {\n  width: 35rem;\n  margin: auto;\n  border: gray solid 3px;\n}\n\nlabel,\ninput,\nselect {\n  flex: 2 50%;\n  flex-grow: 2;\n}\n\ninput,\nselect {\n  margin: 10px 0;\n  padding: 15px 18px;\n  box-sizing: border-box;\n}\n\ninput,\nbutton {\n  max-width: 50%;\n  border-radius: 5px;\n}\n\nbutton {\n  background-color: darkblue;\n  color: white;\n  padding: 10px 20px;\n  margin: 30px 0;\n  font-size: 18px;\n}\n\nbutton:hover {\n  opacity: 0.6;\n  cursor: pointer;\n}\n\n.single,\n.form-header,\n.estimated-trip-cost,\nbutton {\n  flex: 1 100%;\n}\n\n.triple,\n.total-spend,\n.form-header,\n.estimated-trip-cost,\nbutton,\nform,\nh1,\nh2 {\n  text-align: center;\n}\n\n.form-header,\n.estimated-trip-cost,\nbutton {\n  font-weight: bold;\n  margin-bottom: 20px;\n}\n\n.login-instructions {\n  padding-top: 50px;\n  padding-bottom: 25px;\n}\n\n.error-message {\n  color: red;\n}\n\n.dashboard {\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-around;\n}\n\n.triple {\n  flex: 3;\n}\n\n.trips-list {\n  padding: 3%;\n}\n\n.trip-details {\n  margin-top: 1%;\n}\n\n.create-trip-request {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: baseline;\n  align-content: space-around;\n  align-self: flex-end;\n  justify-content: space-around;\n  text-align: left;\n  max-width: 100%;\n  padding: 1% 10%;\n}\n\n.hidden {\n  display: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchTraveler": () => (/* binding */ fetchTraveler),
/* harmony export */   "fetchAllTravelers": () => (/* binding */ fetchAllTravelers),
/* harmony export */   "fetchTrips": () => (/* binding */ fetchTrips),
/* harmony export */   "fetchDestinations": () => (/* binding */ fetchDestinations),
/* harmony export */   "fetchAllData": () => (/* binding */ fetchAllData),
/* harmony export */   "postNewTrip": () => (/* binding */ postNewTrip)
/* harmony export */ });
////////////////////* Global Variables *////////////////////
const allTravelersAPI = 'http://localhost:3001/api/v1/travelers';
const tripsAPI = 'http://localhost:3001/api/v1/trips';
const destinationsAPI = 'http://localhost:3001/api/v1/destinations';
let traveler;
let allTravelers;
let allTrips;
let allDestinations;
let travelerID;

////////////////////* Fetch Calls *////////////////////

/////* Fetch Individual Traveler */////
const fetchTraveler = (travelerID) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${travelerID}`)
    .then(response => {
      if (!response.ok) {
        console.log(`Response code: ${response.status}`);
        throw Error('Something went wrong.');
      }
      return response.json();
    })
    .then(data => {
      traveler = data;
      return traveler;
    })
    .catch(error => {
      console.log(error);
    });
}

/////* Fetch All Travelers */////
const fetchAllTravelers = () => {
  return fetch(allTravelersAPI)
    .then(response => {
      if (!response.ok) {
        console.log(`Response code: ${response.status}`);
        throw Error('Something went wrong.');
      }
      return response.json();
    })
    .then(data => {
      allTravelers = data.travelers;
      return allTravelers;
    })
    .catch(error => {
      console.log(error);
    });
}

/////* Fetch All Trips */////
const fetchTrips = () => {
  return fetch(tripsAPI)
    .then(response => {
      if (!response.ok) {
        console.log(`Response code: ${response.status}`);
        throw Error('Something went wrong.');
      }
      return response.json();
    })
    .then(data => {
      allTrips = data.trips;
      return allTrips;
    })
    .catch(error => {
      console.log(error);
    });
}

/////* Fetch All Destinations */////
const fetchDestinations = () => {
  return fetch(destinationsAPI)
    .then(response => {
      if (!response.ok) {
        console.log(`Response code: ${response.status}`);
        throw Error('Something went wrong.');
      }
      return response.json();
    })
    .then(data => {
      allDestinations = data.destinations;
      return allDestinations;
    })
    .catch(error => {
      console.log(error);
    });
}

/////* Fetch All Data */////
const fetchAllData = (travelerID) => {
  travelerID = travelerID.toString();
  return Promise.all([
    fetchTraveler(travelerID),
    fetchAllTravelers(),
    fetchTrips(),
    fetchDestinations()
  ]);
}

/////* POST New Trip */////
const postNewTrip = (newTrip) => {
  return fetch(tripsAPI, {
    method: 'POST',
    body: JSON.stringify(newTrip),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        console.log(`Response code: ${response.status}`);
        throw Error('Something went wrong.');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return fetchAllData(data.newTrip.userID);
    })
    .catch(error => {
      console.log(error);
    });
}


////////////////////* Exports *////////////////////


/***/ }),
/* 7 */
/***/ ((module) => {

////////////////////* Functions *////////////////////
function verifyUserName(input) {
  const id = parseInt(input.slice(8));
  if (input.slice(0, 8) === 'traveler' && id > 0 && id < 51) {
    return true;
  } else {
    return false;
  };
}

function verifyPassword(input) {
  if (input === 'travel') {
    return true;
  } else {
    return false;
  };
}

function getCurrentTraveler(traveler, trips, destinations) {
  const travelerTripsData = trips.filter((trip) => {
    return trip.userID === traveler.id;
  });

  const travelerDestinationIDs = travelerTripsData.map((trip) => {
    return trip.destinationID;
  });

  const travelerDestinationsData = destinations.filter((destination) => {
    return travelerDestinationIDs.includes(destination.id);
  });

  const currentTraveler = {
    traveler: traveler,
    trips: travelerTripsData || [],
    destinations: travelerDestinationsData || []
  };
  return currentTraveler;
}

function getCompleteTrip(trip, destinations) {
  if (!trip) {
    return null;
  } else {
    const destinationOfTrip = destinations.find(destination => destination.id === trip.destinationID);
    return {
      tripID: trip.id,
      userID: trip.userID,
      destination: destinationOfTrip.destination,
      destinationImage: destinationOfTrip.image,
      estimatedLodgingCostPerDay: destinationOfTrip.estimatedLodgingCostPerDay,
      estimatedFlightCostPerPerson: destinationOfTrip.estimatedFlightCostPerPerson,
      tripDate: trip.date,
      tripDuration: trip.duration,
      status: trip.status,
      travelers: trip.travelers,
      suggestedActivities: trip.suggestedActivities,
    };
  };
}

function getCurrentTravelerCompleteTrips(trips, destinations) {
  if (!trips) {
    return null;
  } else {
    return trips.map(trip => getCompleteTrip(trip, destinations));
  };
}

function getTotalSpendThisYear(combinedTrips, year) {
  let totalSpend = 0;
  combinedTrips.forEach((trip) => {
    if (trip.tripDate.includes(year)) {
      totalSpend += ((trip.estimatedLodgingCostPerDay * trip.tripDuration) + (trip.estimatedFlightCostPerPerson * trip.travelers)) * 1.1;
    };
  });
  return totalSpend.toFixed(2);
}

function getCostOfRequestedTrip(duration, numOfTravelers, destinationID, destinations) {
  const requestedDestination = destinations.find((destination) => {
    return parseInt(destination.id) === parseInt(destinationID);
  });
  if (!requestedDestination) {
    return null;
  } else {
    return (((requestedDestination.estimatedLodgingCostPerDay * duration) + (requestedDestination.estimatedFlightCostPerPerson * numOfTravelers)) * 1.1).toFixed(2);
  };
}

const formatDate = (dateString) => {
  return dateString.split('-').join('/');
};

const getNewTripObject = (userID, destID, numofTrav, date, duration, trips) => {
  const tripID = trips.reduce((tripid, trip) => {
    tripid = trip.id;
    return tripid + 1;
  }, 0);
  return {
    id: tripID,
    userID: parseInt(userID),
    destinationID: parseInt(destID),
    travelers: parseInt(numofTrav),
    date: formatDate(date),
    duration: parseInt(duration),
    status: 'pending',
    suggestedActivities: []
  };
}

////////////////////* Exports *////////////////////
module.exports = {
  verifyUserName,
  verifyPassword,
  getCurrentTraveler,
  getCompleteTrip,
  getCurrentTravelerCompleteTrips,
  getTotalSpendThisYear,
  getCostOfRequestedTrip,
  formatDate,
  getNewTripObject
}

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addLoginErrorMessage": () => (/* binding */ addLoginErrorMessage),
/* harmony export */   "clearLoginErrorMessage": () => (/* binding */ clearLoginErrorMessage),
/* harmony export */   "updateGreeting": () => (/* binding */ updateGreeting),
/* harmony export */   "updatePastTripsList": () => (/* binding */ updatePastTripsList),
/* harmony export */   "updatePendingTripsList": () => (/* binding */ updatePendingTripsList),
/* harmony export */   "updateUpcomingTripsList": () => (/* binding */ updateUpcomingTripsList),
/* harmony export */   "updateTotalSpendAmount": () => (/* binding */ updateTotalSpendAmount),
/* harmony export */   "updateDestinationsDropDown": () => (/* binding */ updateDestinationsDropDown),
/* harmony export */   "updateEstimatedTripCost": () => (/* binding */ updateEstimatedTripCost),
/* harmony export */   "username": () => (/* binding */ username),
/* harmony export */   "password": () => (/* binding */ password),
/* harmony export */   "loginButton": () => (/* binding */ loginButton),
/* harmony export */   "loginForm": () => (/* binding */ loginForm),
/* harmony export */   "travelerDashboard": () => (/* binding */ travelerDashboard),
/* harmony export */   "tripRequestForm": () => (/* binding */ tripRequestForm),
/* harmony export */   "requestedTripDate": () => (/* binding */ requestedTripDate),
/* harmony export */   "requestedTripDuration": () => (/* binding */ requestedTripDuration),
/* harmony export */   "requestedTripTravelers": () => (/* binding */ requestedTripTravelers),
/* harmony export */   "destinationsDropDown": () => (/* binding */ destinationsDropDown),
/* harmony export */   "tripRequestSubmitButton": () => (/* binding */ tripRequestSubmitButton),
/* harmony export */   "estimatedTripCost": () => (/* binding */ estimatedTripCost)
/* harmony export */ });
////////////////////* Query Selectors *////////////////////
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const loginButton = document.querySelector('#loginButton');
const loginForm = document.querySelector('#loginForm');
const loginError = document.querySelector('#errorMessage');
const travelerDashboard = document.querySelector('#travelerDashboard');
const greeting = document.querySelector('#travelerDashboardHeader');
const pastTripsList = document.querySelector('#pastTrips');
const pendingTripsList = document.querySelector('#pendingTrips');
const upcomingTripsList = document.querySelector('#upcomingTrips');
const totalSpendAmount = document.querySelector('#totalSpendAmount');
const tripRequestForm = document.querySelector('#tripRequestForm');
const requestedTripDate = document.querySelector('#startDate');
const requestedTripDuration = document.querySelector('#duration');
const requestedTripTravelers = document.querySelector('#numOfTravelers');
const destinationsDropDown = document.querySelector('#destinations');
const estimatedTripCost = document.querySelector('#estimatedTripCost');
const tripRequestSubmitButton = document.querySelector('#tripRequestSubmitButton');

////////////////////* DOM Updates *////////////////////
const addLoginErrorMessage = () => {
  loginError.innerHTML = 'Invalid login credentials entered, please try again.';
}

const clearLoginErrorMessage = () => {
  loginError.innerHTML = '';
}

const updateGreeting = (currentTraveler) => {
  greeting.innerHTML = '';

  if (!currentTraveler) {
    greeting.innerHTML = `<li>Welcome, Traveler!</li>`;
  }

  greeting.innerHTML = `<h1>Welcome back, ${currentTraveler.traveler.name}!</h1>`;
}

const updatePastTripsList = (currentTravelerCompleteTrips) => {
  pastTripsList.innerHTML = '';

  const dateCheckedTrips = [];
  currentTravelerCompleteTrips.forEach((trip) => {
    if ((Date.parse(trip.tripDate) < Date.parse(new Date())) && trip.status === 'approved') {
      dateCheckedTrips.push(trip);
    }
    return dateCheckedTrips;
  })

  const currentTravelerPastTrip = dateCheckedTrips.map(trip =>
    `<li><img src="${trip.destinationImage}" alt="${trip.destination}" width="100%" height="auto"><p class="trip-details">${trip.tripDate}: ${trip.tripDuration} days in ${trip.destination}</p></li>`).join('');

  if (!currentTravelerPastTrip) {
    pastTripsList.innerHTML = `<li>You currently have no past trips.</li>`;
  }

  pastTripsList.innerHTML += currentTravelerPastTrip;
}

const updatePendingTripsList = (currentTravelerCompleteTrips) => {
  pendingTripsList.innerHTML = '';

  const dateCheckedTrips = [];
  currentTravelerCompleteTrips.forEach((trip) => {
    if (trip.status === 'pending') {
      dateCheckedTrips.push(trip);
    }
    return dateCheckedTrips;
  })

  const currentTravelerPendingTrip = dateCheckedTrips.map(trip =>
    `<li><img src="${trip.destinationImage}" alt="${trip.destination}" width="100%" height="auto"><p class="trip-details">${trip.tripDate}: ${trip.tripDuration} days in ${trip.destination}</p></li>`).join('');

  if (!currentTravelerPendingTrip) {
    pendingTripsList.innerHTML = `<li>You currently have no pending trips.</li>`;
  }

  pendingTripsList.innerHTML += currentTravelerPendingTrip;
}

const updateUpcomingTripsList = (currentTravelerCompleteTrips) => {
  upcomingTripsList.innerHTML = '';

  const dateCheckedTrips = [];
  currentTravelerCompleteTrips.forEach((trip) => {
    if ((Date.parse(trip.tripDate) > Date.parse(new Date())) && trip.status === 'approved') {
      dateCheckedTrips.push(trip);
    }
    return dateCheckedTrips;
  })

  const currentTravelerPastTrip = dateCheckedTrips.map(trip =>
    `<li><img src="${trip.destinationImage}" alt="${trip.destination}" width="100%" height="auto"><p class="trip-details">${trip.tripDate}: ${trip.tripDuration} days in ${trip.destination}</p></li>`).join('');

  if (!currentTravelerPastTrip) {
    upcomingTripsList.innerHTML = `<li>You currently have no upcoming trips.</li>`;
  }
  upcomingTripsList.innerHTML += currentTravelerPastTrip;
}

const updateTotalSpendAmount = (totalSpend) => {
  totalSpendAmount.innerHTML = '';
  totalSpendAmount.innerHTML = `$${totalSpend}`;
}

const updateDestinationsDropDown = (destinations) => {
  const destinationListItem = destinations.map((destination) => {
    return `<option value=${destination.id} name="${destination.destination}">${destination.destination}</option>`
  });
  destinationsDropDown.innerHTML += destinationListItem;
}

const updateEstimatedTripCost = (estimatedCost) => {
  estimatedTripCost.innerHTML = `Your estimated trip cost is: $${estimatedCost}`;
}

////////////////////* Exports *////////////////////


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _api_calls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _script_definitions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _script_definitions__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_script_definitions__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dom_updates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
////////////////////* Import CSS File *////////////////////


////////////////////* Import from api-calls.js *////////////////////


////////////////////* Import from script-definitions.js *////////////////////


////////////////////* Import from dom-updates.js *////////////////////


////////////////////* Event Listeners *////////////////////
_dom_updates__WEBPACK_IMPORTED_MODULE_3__.loginForm.addEventListener('input', (event) => {
  event.preventDefault();
  (0,_dom_updates__WEBPACK_IMPORTED_MODULE_3__.clearLoginErrorMessage)();
});

_dom_updates__WEBPACK_IMPORTED_MODULE_3__.loginButton.addEventListener('click', (event) => {
  event.preventDefault();
  if ((0,_script_definitions__WEBPACK_IMPORTED_MODULE_2__.verifyUserName)(_dom_updates__WEBPACK_IMPORTED_MODULE_3__.username.value) && (0,_script_definitions__WEBPACK_IMPORTED_MODULE_2__.verifyPassword)(_dom_updates__WEBPACK_IMPORTED_MODULE_3__.password.value)) {
    _script_definitions__WEBPACK_IMPORTED_MODULE_2__.travelerID = parseInt(_dom_updates__WEBPACK_IMPORTED_MODULE_3__.username.value.slice(8));
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_3__.clearLoginErrorMessage)();
    _dom_updates__WEBPACK_IMPORTED_MODULE_3__.loginForm.classList.add('hidden');
    _dom_updates__WEBPACK_IMPORTED_MODULE_3__.travelerDashboard.classList.remove('hidden');
    (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.fetchAllData)(_script_definitions__WEBPACK_IMPORTED_MODULE_2__.travelerID)
      .then(data => {
        const traveler = data[0];
        const allTravelers = data[1];
        const allTrips = data[2];
        const allDestinations = data[3];
        const currentTraveler = (0,_script_definitions__WEBPACK_IMPORTED_MODULE_2__.getCurrentTraveler)(traveler, allTrips, allDestinations);
        (0,_dom_updates__WEBPACK_IMPORTED_MODULE_3__.updateGreeting)(currentTraveler);
        const currentTravelerCompleteTrips = (0,_script_definitions__WEBPACK_IMPORTED_MODULE_2__.getCurrentTravelerCompleteTrips)(currentTraveler.trips, currentTraveler.destinations);
        (0,_dom_updates__WEBPACK_IMPORTED_MODULE_3__.updatePastTripsList)(currentTravelerCompleteTrips);
        (0,_dom_updates__WEBPACK_IMPORTED_MODULE_3__.updatePendingTripsList)(currentTravelerCompleteTrips);
        (0,_dom_updates__WEBPACK_IMPORTED_MODULE_3__.updateUpcomingTripsList)(currentTravelerCompleteTrips);
        const today = new Date();
        const currentYear = today.getFullYear();
        const totalSpend = (0,_script_definitions__WEBPACK_IMPORTED_MODULE_2__.getTotalSpendThisYear)(currentTravelerCompleteTrips, currentYear);
        (0,_dom_updates__WEBPACK_IMPORTED_MODULE_3__.updateTotalSpendAmount)(totalSpend);
        (0,_dom_updates__WEBPACK_IMPORTED_MODULE_3__.updateDestinationsDropDown)(allDestinations);
      });
  } else {
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_3__.addLoginErrorMessage)();
  };
});

_dom_updates__WEBPACK_IMPORTED_MODULE_3__.tripRequestForm.addEventListener('input', (event) => {
  event.preventDefault();
  if (_dom_updates__WEBPACK_IMPORTED_MODULE_3__.requestedTripDate.value && _dom_updates__WEBPACK_IMPORTED_MODULE_3__.requestedTripDuration.value && _dom_updates__WEBPACK_IMPORTED_MODULE_3__.requestedTripTravelers.value && _dom_updates__WEBPACK_IMPORTED_MODULE_3__.destinationsDropDown.value) {
    (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.fetchDestinations)()
      .then(data => {
        const allDestinations = data;
        const estimatedCost = (0,_script_definitions__WEBPACK_IMPORTED_MODULE_2__.getCostOfRequestedTrip)(_dom_updates__WEBPACK_IMPORTED_MODULE_3__.requestedTripDuration.value, _dom_updates__WEBPACK_IMPORTED_MODULE_3__.requestedTripTravelers.value, _dom_updates__WEBPACK_IMPORTED_MODULE_3__.destinationsDropDown.value, allDestinations);
        (0,_dom_updates__WEBPACK_IMPORTED_MODULE_3__.updateEstimatedTripCost)(estimatedCost);
      });
  };
});

_dom_updates__WEBPACK_IMPORTED_MODULE_3__.tripRequestSubmitButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (_dom_updates__WEBPACK_IMPORTED_MODULE_3__.requestedTripDate.value && _dom_updates__WEBPACK_IMPORTED_MODULE_3__.requestedTripDuration.value && _dom_updates__WEBPACK_IMPORTED_MODULE_3__.requestedTripTravelers.value && _dom_updates__WEBPACK_IMPORTED_MODULE_3__.destinationsDropDown.value) {
    (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.fetchTrips)()
      .then(data => {
        const allTrips = data;
        const newTrip = (0,_script_definitions__WEBPACK_IMPORTED_MODULE_2__.getNewTripObject)(_script_definitions__WEBPACK_IMPORTED_MODULE_2__.travelerID, _dom_updates__WEBPACK_IMPORTED_MODULE_3__.destinationsDropDown.value, _dom_updates__WEBPACK_IMPORTED_MODULE_3__.requestedTripTravelers.value, _dom_updates__WEBPACK_IMPORTED_MODULE_3__.requestedTripDate.value, _dom_updates__WEBPACK_IMPORTED_MODULE_3__.requestedTripDuration.value, allTrips);
        (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.postNewTrip)(newTrip)
          .then(data => {
            _dom_updates__WEBPACK_IMPORTED_MODULE_3__.requestedTripDate.value = '';
            _dom_updates__WEBPACK_IMPORTED_MODULE_3__.requestedTripDuration.value = '';
            _dom_updates__WEBPACK_IMPORTED_MODULE_3__.requestedTripTravelers.value = '';
            _dom_updates__WEBPACK_IMPORTED_MODULE_3__.destinationsDropDown.value = '';
            _dom_updates__WEBPACK_IMPORTED_MODULE_3__.estimatedTripCost.innerHTML = '';
            const traveler = data[0];
            const allTravelers = data[1];
            const allTrips = data[2];
            const allDestinations = data[3];
            const currentTraveler = (0,_script_definitions__WEBPACK_IMPORTED_MODULE_2__.getCurrentTraveler)(traveler, allTrips, allDestinations);
            const currentTravelerCompleteTrips = (0,_script_definitions__WEBPACK_IMPORTED_MODULE_2__.getCurrentTravelerCompleteTrips)(currentTraveler.trips, currentTraveler.destinations);
            (0,_dom_updates__WEBPACK_IMPORTED_MODULE_3__.updatePendingTripsList)(currentTravelerCompleteTrips);
            const today = new Date();
            const currentYear = today.getFullYear();
            const totalSpend = (0,_script_definitions__WEBPACK_IMPORTED_MODULE_2__.getTotalSpendThisYear)(currentTravelerCompleteTrips, currentYear);
            (0,_dom_updates__WEBPACK_IMPORTED_MODULE_3__.updateTotalSpendAmount)(totalSpend);
          });
      });
  };
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map