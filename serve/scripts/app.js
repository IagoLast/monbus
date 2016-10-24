(function () {
'use strict';

function buildTable(headers, data) {
	var table = document.createElement('table');
	var head = document.createElement('thead');
	var body = document.createElement('tbody');

	for (var i = 0; i < headers.length; i++) {
		var header = _createHeader(headers[i]);
		head.appendChild(header);
	}

	for (var _i = 0; _i < data.length; _i++) {
		body.appendChild(_createRow(data[_i]));
	}

	table.appendChild(head);
	table.appendChild(body);

	return table;
}

function _createHeader(text) {
	var header = document.createElement('th');
	header.innerHTML = text;
	return header;
}

function _createRow(data) {
	var row = document.createElement('tr');
	for (var key in data) {
		if (data.hasOwnProperty(key)) {
			var content = data[key];
			var cell = document.createElement('td');
			cell.innerHTML = content;
			row.appendChild(cell);
		}
	}
	return row;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/*
    JavaScript autoComplete v1.0.4
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/JavaScript-autoComplete
    License: http://www.opensource.org/licenses/mit-license.php
*/
var autoComplete = function () {
	'use strict';

	function autoComplete(options) {
		if (!document.querySelector) return;

		// helpers
		function hasClass(el, className) {
			return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
		}

		function addEvent(el, type, handler) {
			if (el.attachEvent) el.attachEvent('on' + type, handler);else el.addEventListener(type, handler);
		}

		function removeEvent(el, type, handler) {
			// if (el.removeEventListener) not working in IE11
			if (el.detachEvent) el.detachEvent('on' + type, handler);else el.removeEventListener(type, handler);
		}

		function live(elClass, event, cb, context) {
			addEvent(context || document, event, function (e) {
				var found,
				    el = e.target || e.srcElement;
				while (el && !(found = hasClass(el, elClass))) {
					el = el.parentElement;
				}if (found) cb.call(el, e);
			});
		}

		var o = {
			selector: 0,
			source: 0,
			minChars: 3,
			delay: 150,
			offsetLeft: 0,
			offsetTop: 1,
			cache: 1,
			menuClass: '',
			renderItem: function renderItem(item, search) {
				// escape special characters
				search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
				var re = new RegExp('(' + search.split(' ').join('|') + ')', 'gi');
				return '<div class="autocomplete-suggestion" data-val="' + item + '">' + item.replace(re, '<b>$1</b>') + '</div>';
			},
			onSelect: function onSelect() {}
		};
		for (var k in options) {
			if (options.hasOwnProperty(k)) o[k] = options[k];
		}

		// init
		var elems = _typeof(o.selector) == 'object' ? [o.selector] : document.querySelectorAll(o.selector);
		for (var i = 0; i < elems.length; i++) {
			var that = elems[i];

			// create suggestions container "sc"
			that.sc = document.createElement('div');
			that.sc.className = 'autocomplete-suggestions ' + o.menuClass;

			that.autocompleteAttr = that.getAttribute('autocomplete');
			that.setAttribute('autocomplete', 'off');
			that.cache = {};
			that.last_val = '';

			that.updateSC = function (resize, next) {
				var rect = that.getBoundingClientRect();
				that.sc.style.left = Math.round(rect.left + (window.pageXOffset || document.documentElement.scrollLeft) + o.offsetLeft) + 'px';
				that.sc.style.top = Math.round(rect.bottom + (window.pageYOffset || document.documentElement.scrollTop) + o.offsetTop) + 'px';
				that.sc.style.width = Math.round(rect.right - rect.left) + 'px'; // outerWidth
				if (!resize) {
					that.sc.style.display = 'block';
					if (!that.sc.maxHeight) {
						that.sc.maxHeight = parseInt((window.getComputedStyle ? getComputedStyle(that.sc, null) : that.sc.currentStyle).maxHeight);
					}
					if (!that.sc.suggestionHeight) that.sc.suggestionHeight = that.sc.querySelector('.autocomplete-suggestion').offsetHeight;
					if (that.sc.suggestionHeight) if (!next) that.sc.scrollTop = 0;else {
						var scrTop = that.sc.scrollTop,
						    selTop = next.getBoundingClientRect().top - that.sc.getBoundingClientRect().top;
						if (selTop + that.sc.suggestionHeight - that.sc.maxHeight > 0) that.sc.scrollTop = selTop + that.sc.suggestionHeight + scrTop - that.sc.maxHeight;else if (selTop < 0) that.sc.scrollTop = selTop + scrTop;
					}
				}
			};
			addEvent(window, 'resize', that.updateSC);
			document.body.appendChild(that.sc);

			live('autocomplete-suggestion', 'mouseleave', function () {
				var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
				if (sel) setTimeout(function () {
					sel.className = sel.className.replace('selected', '');
				}, 20);
			}, that.sc);

			live('autocomplete-suggestion', 'mouseover', function () {
				var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
				if (sel) sel.className = sel.className.replace('selected', '');
				this.className += ' selected';
			}, that.sc);

			live('autocomplete-suggestion', 'mousedown', function (e) {
				if (hasClass(this, 'autocomplete-suggestion')) {
					// else outside click
					var v = this.getAttribute('data-val');
					that.value = v;
					o.onSelect(e, v, this);
					that.sc.style.display = 'none';
				}
			}, that.sc);

			that.blurHandler = function () {
				var over_sb;
				try {
					over_sb = document.querySelector('.autocomplete-suggestions:hover');
				} catch (e) {
					over_sb = 0;
				}
				if (!over_sb) {
					that.last_val = that.value;
					that.sc.style.display = 'none';
					setTimeout(function () {
						that.sc.style.display = 'none';
					}, 350); // hide suggestions on fast input
				} else if (that !== document.activeElement) setTimeout(function () {
					that.focus();
				}, 20);
			};
			addEvent(that, 'blur', that.blurHandler);

			var suggest = function suggest(data) {
				var val = that.value;
				that.cache[val] = data;
				if (data.length && val.length >= o.minChars) {
					var s = '';
					for (var i = 0; i < data.length; i++) {
						s += o.renderItem(data[i], val);
					}that.sc.innerHTML = s;
					that.updateSC(0);
				} else that.sc.style.display = 'none';
			};

			that.keydownHandler = function (e) {
				var key = window.event ? e.keyCode : e.which;
				if ((key == 40 || key == 38) && that.sc.innerHTML) {
					var next,
					    sel = that.sc.querySelector('.autocomplete-suggestion.selected');
					if (!sel) {
						next = key == 40 ? that.sc.querySelector('.autocomplete-suggestion') : that.sc.childNodes[that.sc.childNodes.length - 1]; // first : last
						next.className += ' selected';
						that.value = next.getAttribute('data-val');
					} else {
						next = key == 40 ? sel.nextSibling : sel.previousSibling;
						if (next) {
							sel.className = sel.className.replace('selected', '');
							next.className += ' selected';
							that.value = next.getAttribute('data-val');
						} else {
							sel.className = sel.className.replace('selected', '');
							that.value = that.last_val;
							next = 0;
						}
					}
					that.updateSC(0, next);
					return false;
				}
				// esc
				else if (key == 27) {
						that.value = that.last_val;
						that.sc.style.display = 'none';
					}
					// enter
					else if (key == 13 || key == 9) {
							sel = that.sc.querySelector('.autocomplete-suggestion.selected');
							if (sel && that.sc.style.display != 'none') {
								o.onSelect(e, sel.getAttribute('data-val'), sel);
								setTimeout(function () {
									that.sc.style.display = 'none';
								}, 20);
							}
						}
			};
			addEvent(that, 'keydown', that.keydownHandler);

			that.keyupHandler = function (e) {
				var key = window.event ? e.keyCode : e.which;
				if (!key || (key < 35 || key > 40) && key != 13 && key != 27) {
					var val = that.value;
					if (val.length >= o.minChars) {
						if (val != that.last_val) {
							that.last_val = val;
							clearTimeout(that.timer);
							if (o.cache) {
								if (val in that.cache) {
									suggest(that.cache[val]);
									return;
								}
								// no requests if previous suggestions were empty
								for (var i = 1; i < val.length - o.minChars; i++) {
									var part = val.slice(0, val.length - i);
									if (part in that.cache && !that.cache[part].length) {
										suggest([]);
										return;
									}
								}
							}
							that.timer = setTimeout(function () {
								o.source(val, suggest);
							}, o.delay);
						}
					} else {
						that.last_val = val;
						that.sc.style.display = 'none';
					}
				}
			};
			addEvent(that, 'keyup', that.keyupHandler);

			that.focusHandler = function (e) {
				that.last_val = '\n';
				that.keyupHandler(e);
			};
			if (!o.minChars) addEvent(that, 'focus', that.focusHandler);
		}

		// public destroy method
		this.destroy = function () {
			for (var i = 0; i < elems.length; i++) {
				var that = elems[i];
				removeEvent(window, 'resize', that.updateSC);
				removeEvent(that, 'blur', that.blurHandler);
				removeEvent(that, 'focus', that.focusHandler);
				removeEvent(that, 'keydown', that.keydownHandler);
				removeEvent(that, 'keyup', that.keyupHandler);
				if (that.autocompleteAttr) that.setAttribute('autocomplete', that.autocompleteAttr);else that.removeAttribute('autocomplete');
				document.body.removeChild(that.sc);
				that = null;
			}
		};
	}
	return autoComplete;
}();

function AppFactory(serverUrl) {
	var App = { init: init };
	var stationsData = void 0;
	var stationsArray = void 0;

	function init() {
		stationsData = {};
		stationsArray = [];
		document.querySelector('input[name="date"').valueAsDate = new Date();
		document.querySelector('input[type="button"').addEventListener('click', _onBtnSearchClick);

		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('service-worker.js');
		}

		fetch('stations.json', { method: 'get' }).then(function (response) {
			return response.json();
		}).then(_populateSelects);
	}

	function _populateSelects(stations) {
		stations.forEach(function (element) {
			stationsArray.push(element.name);
			stationsData[element.name] = element.id;
		});

		_newAutocomplete('input[name="from"]');
		_newAutocomplete('input[name="to"]');
	}

	function _newAutocomplete(selector) {
		return new autoComplete({
			selector: selector,
			minChars: 1,
			source: function source(term, suggest) {
				term = term.toLowerCase();
				var suggestions = [];
				for (var i = 0; i < stationsArray.length; i++) {
					if (stationsArray[i].toLowerCase().includes(term)) {
						suggestions.push(stationsArray[i]);
					}
				}
				suggest(suggestions);
			}
		});
	}

	function _onBtnSearchClick() {
		var from = stationsData[document.querySelector('input[name="from"').value];
		var to = stationsData[document.querySelector('input[name="to"').value];
		var date = document.querySelector('input[name="date"').value;

		if (!from || !to || !date) {
			return;
		}

		_deleteOldTable();
		_changeVisibleElements('none', 'block', 'none');

		fetch('' + serverUrl + from + '/' + to + '/' + date, { method: 'get' }).then(function (response) {
			return response.json();
		}).then(_onResponse).catch(_onError);
	}

	function _onResponse(response) {
		var table = void 0;
		if (response.length <= 0) {
			return _onError();
		}
		_changeVisibleElements('block', 'none', 'none');
		table = buildTable(['Salida', 'Llegada', 'Precio'], response);
		document.querySelector('section').appendChild(table);
	}

	function _onError() {
		_changeVisibleElements('block', 'none', 'block');
	}

	function _deleteOldTable() {
		var table = document.querySelector('table');
		if (table) {
			document.querySelector('section').removeChild(table);
		}
	}

	function _changeVisibleElements(button, spinner, error) {
		document.querySelector('input[type="button"').style.display = button;
		document.querySelector('.spinner').style.display = spinner;
		document.querySelector('.error-msg').style.display = error;
	}

	return App;
}

var app = AppFactory('https://monbus.herokuapp.com/');
app.init();

}());
