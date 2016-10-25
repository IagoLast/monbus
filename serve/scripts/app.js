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
	table.classList.add('timetable');

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

function fetch(url) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('get', url, true);
		xhr.onreadystatechange = function () {
			var status = void 0;
			if (xhr.readyState === 4) {
				status = xhr.status;
				if (status == 200) {
					resolve(JSON.parse(xhr.responseText));
				} else {
					reject(status);
				}
			}
		};
		xhr.send();
	});
}

/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */
var hasEventListeners = !!window.addEventListener;
var document$1 = window.document;
var sto = window.setTimeout;
var addEvent = function addEvent(el, e, callback, capture) {
	if (hasEventListeners) {
		el.addEventListener(e, callback, !!capture);
	} else {
		el.attachEvent('on' + e, callback);
	}
};
var removeEvent = function removeEvent(el, e, callback, capture) {
	if (hasEventListeners) {
		el.removeEventListener(e, callback, !!capture);
	} else {
		el.detachEvent('on' + e, callback);
	}
};
var fireEvent = function fireEvent(el, eventName, data) {
	var ev;

	if (document$1.createEvent) {
		ev = document$1.createEvent('HTMLEvents');
		ev.initEvent(eventName, true, false);
		ev = extend(ev, data);
		el.dispatchEvent(ev);
	} else if (document$1.createEventObject) {
		ev = document$1.createEventObject();
		ev = extend(ev, data);
		el.fireEvent('on' + eventName, ev);
	}
};
var trim = function trim(str) {
	return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
};
var hasClass = function hasClass(el, cn) {
	return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
};
var addClass = function addClass(el, cn) {
	if (!hasClass(el, cn)) {
		el.className = el.className === '' ? cn : el.className + ' ' + cn;
	}
};
var removeClass = function removeClass(el, cn) {
	el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
};
var isArray = function isArray(obj) {
	return (/Array/.test(Object.prototype.toString.call(obj))
	);
};
var isDate = function isDate(obj) {
	return (/Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime())
	);
};
var isWeekend = function isWeekend(date) {
	var day = date.getDay();
	return day === 0 || day === 6;
};
var isLeapYear = function isLeapYear(year) {
	// solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
	return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};
var getDaysInMonth = function getDaysInMonth(year, month) {
	return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};
var setToStartOfDay = function setToStartOfDay(date) {
	if (isDate(date)) date.setHours(0, 0, 0, 0);
};
var compareDates = function compareDates(a, b) {
	// weak date comparison (use setToStartOfDay(date) to ensure correct result)
	return a.getTime() === b.getTime();
};
var extend = function extend(to, from, overwrite) {
	var prop, hasProp;
	for (prop in from) {
		hasProp = to[prop] !== undefined;
		if (hasProp && _typeof(from[prop]) === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
			if (isDate(from[prop])) {
				if (overwrite) {
					to[prop] = new Date(from[prop].getTime());
				}
			} else if (isArray(from[prop])) {
				if (overwrite) {
					to[prop] = from[prop].slice(0);
				}
			} else {
				to[prop] = extend({}, from[prop], overwrite);
			}
		} else if (overwrite || !hasProp) {
			to[prop] = from[prop];
		}
	}
	return to;
};
var adjustCalendar = function adjustCalendar(calendar) {
	if (calendar.month < 0) {
		calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
		calendar.month += 12;
	}
	if (calendar.month > 11) {
		calendar.year += Math.floor(Math.abs(calendar.month) / 12);
		calendar.month -= 12;
	}
	return calendar;
};
var defaults$1 = {

	// bind the picker to a form field
	field: null,

	// automatically show/hide the picker on `field` focus (default `true` if `field` is set)
	bound: undefined,

	// position of the datepicker, relative to the field (default to bottom & left)
	// ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
	position: 'bottom left',

	// automatically fit in the viewport even if it means repositioning from the position option
	reposition: true,

	// the default output format for `.toString()` and `field` value
	format: 'YYYY-MM-DD',

	// the initial date to view when first opened
	defaultDate: null,

	// make the `defaultDate` the initial selected value
	setDefaultDate: false,

	// first day of week (0: Sunday, 1: Monday etc)
	firstDay: 0,

	// the default flag for moment's strict date parsing
	formatStrict: false,

	// the minimum/earliest date that can be selected
	minDate: null,
	// the maximum/latest date that can be selected
	maxDate: null,

	// number of years either side, or array of upper/lower range
	yearRange: 10,

	// show week numbers at head of row
	showWeekNumber: false,

	// used internally (don't config outside)
	minYear: 0,
	maxYear: 9999,
	minMonth: undefined,
	maxMonth: undefined,

	startRange: null,
	endRange: null,

	isRTL: false,

	// Additional text to append to the year in the calendar title
	yearSuffix: '',

	// Render the month after year in the calendar title
	showMonthAfterYear: false,

	// Render days of the calendar grid that fall in the next or previous month
	showDaysInNextAndPreviousMonths: false,

	// how many months are visible
	numberOfMonths: 1,

	// when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
	// only used for the first display or when a selected date is not visible
	mainCalendar: 'left',

	// Specify a DOM element to render the calendar in
	container: undefined,

	// internationalization
	i18n: {
		previousMonth: 'Mes anterior',
		nextMonth: 'Mes siguiente',
		months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab']
	},

	// Theme Classname
	theme: null,

	// callback function
	onSelect: null,
	onOpen: null,
	onClose: null,
	onDraw: null
};
var renderDayName = function renderDayName(opts, day, abbr) {
	day += opts.firstDay;
	while (day >= 7) {
		day -= 7;
	}
	return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
};
var renderDay = function renderDay(opts) {
	var arr = [];
	var ariaSelected = 'false';
	if (opts.isEmpty) {
		if (opts.showDaysInNextAndPreviousMonths) {
			arr.push('is-outside-current-month');
		} else {
			return '<td class="is-empty"></td>';
		}
	}
	if (opts.isDisabled) {
		arr.push('is-disabled');
	}
	if (opts.isToday) {
		arr.push('is-today');
	}
	if (opts.isSelected) {
		arr.push('is-selected');
		ariaSelected = 'true';
	}
	if (opts.isInRange) {
		arr.push('is-inrange');
	}
	if (opts.isStartRange) {
		arr.push('is-startrange');
	}
	if (opts.isEndRange) {
		arr.push('is-endrange');
	}
	return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' + '<button class="pika-button pika-day" type="button" ' + 'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' + opts.day + '</button>' + '</td>';
};
var renderWeek = function renderWeek(d, m, y) {
	// Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
	var onejan = new Date(y, 0, 1),
	    weekNum = Math.ceil(((new Date(y, m, d) - onejan) / 86400000 + onejan.getDay() + 1) / 7);
	return '<td class="pika-week">' + weekNum + '</td>';
};
var renderRow = function renderRow(days, isRTL) {
	return '<tr>' + (isRTL ? days.reverse() : days).join('') + '</tr>';
};
var renderBody = function renderBody(rows) {
	return '<tbody>' + rows.join('') + '</tbody>';
};
var renderHead = function renderHead(opts) {
	var i,
	    arr = [];
	if (opts.showWeekNumber) {
		arr.push('<th></th>');
	}
	for (i = 0; i < 7; i++) {
		arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
	}
	return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
};
var renderTitle = function renderTitle(instance, c, year, month, refYear, randId) {
	var i,
	    j,
	    arr,
	    opts = instance._o,
	    isMinYear = year === opts.minYear,
	    isMaxYear = year === opts.maxYear,
	    html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">',
	    monthHtml,
	    yearHtml,
	    prev = true,
	    next = true;

	for (arr = [], i = 0; i < 12; i++) {
		arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' + (i === month ? ' selected="selected"' : '') + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? 'disabled="disabled"' : '') + '>' + opts.i18n.months[i] + '</option>');
	}

	monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

	if (isArray(opts.yearRange)) {
		i = opts.yearRange[0];
		j = opts.yearRange[1] + 1;
	} else {
		i = year - opts.yearRange;
		j = 1 + year + opts.yearRange;
	}

	for (arr = []; i < j && i <= opts.maxYear; i++) {
		if (i >= opts.minYear) {
			arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"' : '') + '>' + i + '</option>');
		}
	}
	yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

	if (opts.showMonthAfterYear) {
		html += yearHtml + monthHtml;
	} else {
		html += monthHtml + yearHtml;
	}

	if (isMinYear && (month === 0 || opts.minMonth >= month)) {
		prev = false;
	}

	if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
		next = false;
	}

	if (c === 0) {
		html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
	}
	if (c === instance._o.numberOfMonths - 1) {
		html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
	}

	return html += '</div>';
};
var renderTable = function renderTable(opts, data, randId) {
	return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + randId + '">' + renderHead(opts) + renderBody(data) + '</table>';
};
var Pikaday = function Pikaday(options) {
	var self = this,
	    opts = self.config(options);

	self._onMouseDown = function (e) {
		if (!self._v) {
			return;
		}
		e = e || window.event;
		var target = e.target || e.srcElement;
		if (!target) {
			return;
		}

		if (!hasClass(target, 'is-disabled')) {
			if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty') && !hasClass(target.parentNode, 'is-disabled')) {
				self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
				if (opts.bound) {
					sto(function () {
						self.hide();
						if (opts.field) {
							opts.field.blur();
						}
					}, 100);
				}
			} else if (hasClass(target, 'pika-prev')) {
				self.prevMonth();
			} else if (hasClass(target, 'pika-next')) {
				self.nextMonth();
			}
		}
		if (!hasClass(target, 'pika-select')) {
			// if this is touch event prevent mouse events emulation
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
				return false;
			}
		} else {
			self._c = true;
		}
	};

	self._onChange = function (e) {
		e = e || window.event;
		var target = e.target || e.srcElement;
		if (!target) {
			return;
		}
		if (hasClass(target, 'pika-select-month')) {
			self.gotoMonth(target.value);
		} else if (hasClass(target, 'pika-select-year')) {
			self.gotoYear(target.value);
		}
	};

	self._onKeyChange = function (e) {
		e = e || window.event;

		if (self.isVisible()) {
			switch (e.keyCode) {
				case 13:
				case 27:
					opts.field.blur();
					break;
				case 37:
					e.preventDefault();
					self.adjustDate('subtract', 1);
					break;
				case 38:
					self.adjustDate('subtract', 7);
					break;
				case 39:
					self.adjustDate('add', 1);
					break;
				case 40:
					self.adjustDate('add', 7);
					break;
			}
		}
	};

	self._onInputChange = function (e) {
		var date;

		if (e.firedBy === self) {
			return;
		}
		date = new Date(Date.parse(opts.field.value));
		if (isDate(date)) {
			self.setDate(date);
		}
		if (!self._v) {
			self.show();
		}
	};

	self._onInputFocus = function () {
		self.show();
	};

	self._onInputClick = function () {
		self.show();
	};

	self._onInputBlur = function () {
		// IE allows pika div to gain focus; catch blur the input field
		var pEl = document$1.activeElement;
		do {
			if (hasClass(pEl, 'pika-single')) {
				return;
			}
		} while (pEl = pEl.parentNode);

		if (!self._c) {
			self._b = sto(function () {
				self.hide();
			}, 50);
		}
		self._c = false;
	};

	self._onClick = function (e) {
		e = e || window.event;
		var target = e.target || e.srcElement,
		    pEl = target;
		if (!target) {
			return;
		}
		if (!hasEventListeners && hasClass(target, 'pika-select')) {
			if (!target.onchange) {
				target.setAttribute('onchange', 'return;');
				addEvent(target, 'change', self._onChange);
			}
		}
		do {
			if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
				return;
			}
		} while (pEl = pEl.parentNode);
		if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
			self.hide();
		}
	};

	self.el = document$1.createElement('div');
	self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

	addEvent(self.el, 'mousedown', self._onMouseDown, true);
	addEvent(self.el, 'touchend', self._onMouseDown, true);
	addEvent(self.el, 'change', self._onChange);
	addEvent(document$1, 'keydown', self._onKeyChange);

	if (opts.field) {
		if (opts.container) {
			opts.container.appendChild(self.el);
		} else if (opts.bound) {
			document$1.body.appendChild(self.el);
		} else {
			opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
		}
		addEvent(opts.field, 'change', self._onInputChange);

		if (!opts.defaultDate) {
			opts.defaultDate = new Date(Date.parse(opts.field.value));
			opts.setDefaultDate = true;
		}
	}

	var defDate = opts.defaultDate;

	if (isDate(defDate)) {
		if (opts.setDefaultDate) {
			self.setDate(defDate, true);
		} else {
			self.gotoDate(defDate);
		}
	} else {
		self.gotoDate(new Date());
	}

	if (opts.bound) {
		this.hide();
		self.el.className += ' is-bound';
		addEvent(opts.trigger, 'click', self._onInputClick);
		addEvent(opts.trigger, 'focus', self._onInputFocus);
		addEvent(opts.trigger, 'blur', self._onInputBlur);
	} else {
		this.show();
	}
};

/**
 * public Pikaday API
 */
Pikaday.prototype = {

	/**
  * configure functionality
  */
	config: function config(options) {
		if (!this._o) {
			this._o = extend({}, defaults$1, true);
		}

		var opts = extend(this._o, options, true);

		opts.isRTL = !!opts.isRTL;

		opts.field = opts.field && opts.field.nodeName ? opts.field : null;

		opts.theme = typeof opts.theme === 'string' && opts.theme ? opts.theme : null;

		opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

		opts.trigger = opts.trigger && opts.trigger.nodeName ? opts.trigger : opts.field;

		opts.disableWeekends = !!opts.disableWeekends;

		opts.disableDayFn = typeof opts.disableDayFn === 'function' ? opts.disableDayFn : null;

		var nom = parseInt(opts.numberOfMonths, 10) || 1;
		opts.numberOfMonths = nom > 4 ? 4 : nom;

		if (!isDate(opts.minDate)) {
			opts.minDate = false;
		}
		if (!isDate(opts.maxDate)) {
			opts.maxDate = false;
		}
		if (opts.minDate && opts.maxDate && opts.maxDate < opts.minDate) {
			opts.maxDate = opts.minDate = false;
		}
		if (opts.minDate) {
			this.setMinDate(opts.minDate);
		}
		if (opts.maxDate) {
			this.setMaxDate(opts.maxDate);
		}

		if (isArray(opts.yearRange)) {
			var fallback = new Date().getFullYear() - 10;
			opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
			opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
		} else {
			opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults$1.yearRange;
			if (opts.yearRange > 100) {
				opts.yearRange = 100;
			}
		}

		return opts;
	},

	/**
  * return a formatted string of the current selection (using Moment.js if available)
  */
	toString: function toString() {
		return !isDate(this._d) ? '' : this.dateToString(this._d);
	},

	/**
  * Return a date in format yyyy-mm-dd
  */
	dateToString: function dateToString(date) {
		var string = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
		return string;
	},


	/**
  * return a Date object of the current selection with fallback for the current date
  */
	getDate: function getDate() {
		return isDate(this._d) ? new Date(this._d.getTime()) : new Date();
	},

	/**
  * set the current selection
  */
	setDate: function setDate(date, preventOnSelect) {
		if (!date) {
			this._d = null;

			if (this._o.field) {
				this._o.field.value = '';
				fireEvent(this._o.field, 'change', { firedBy: this });
			}

			return this.draw();
		}
		if (typeof date === 'string') {
			date = new Date(Date.parse(date));
		}
		if (!isDate(date)) {
			return;
		}

		var min = this._o.minDate,
		    max = this._o.maxDate;

		if (isDate(min) && date < min) {
			date = min;
		} else if (isDate(max) && date > max) {
			date = max;
		}

		this._d = new Date(date.getTime());
		setToStartOfDay(this._d);
		this.gotoDate(this._d);

		if (this._o.field) {
			this._o.field.value = this.toString();
			fireEvent(this._o.field, 'change', { firedBy: this });
		}
		if (!preventOnSelect && typeof this._o.onSelect === 'function') {
			this._o.onSelect.call(this, this.getDate());
		}
	},

	/**
  * change view to a specific date
  */
	gotoDate: function gotoDate(date) {
		var newCalendar = true;

		if (!isDate(date)) {
			return;
		}

		if (this.calendars) {
			var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
			    lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
			    visibleDate = date.getTime();
			// get the end of the month
			lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
			lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
			newCalendar = visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
		}

		if (newCalendar) {
			this.calendars = [{
				month: date.getMonth(),
				year: date.getFullYear()
			}];
			if (this._o.mainCalendar === 'right') {
				this.calendars[0].month += 1 - this._o.numberOfMonths;
			}
		}

		this.adjustCalendars();
	},

	adjustDate: function adjustDate(sign, days) {

		var day = this.getDate();
		var difference = parseInt(days) * 24 * 60 * 60 * 1000;

		var newDay;

		if (sign === 'add') {
			newDay = new Date(day.valueOf() + difference);
		} else if (sign === 'subtract') {
			newDay = new Date(day.valueOf() - difference);
		}
		this.setDate(newDay);
	},

	adjustCalendars: function adjustCalendars() {
		this.calendars[0] = adjustCalendar(this.calendars[0]);
		for (var c = 1; c < this._o.numberOfMonths; c++) {
			this.calendars[c] = adjustCalendar({
				month: this.calendars[0].month + c,
				year: this.calendars[0].year
			});
		}
		this.draw();
	},

	gotoToday: function gotoToday() {
		this.gotoDate(new Date());
	},

	/**
  * change view to a specific month (zero-index, e.g. 0: January)
  */
	gotoMonth: function gotoMonth(month) {
		if (!isNaN(month)) {
			this.calendars[0].month = parseInt(month, 10);
			this.adjustCalendars();
		}
	},

	nextMonth: function nextMonth() {
		this.calendars[0].month++;
		this.adjustCalendars();
	},

	prevMonth: function prevMonth() {
		this.calendars[0].month--;
		this.adjustCalendars();
	},

	/**
  * change view to a specific full year (e.g. "2012")
  */
	gotoYear: function gotoYear(year) {
		if (!isNaN(year)) {
			this.calendars[0].year = parseInt(year, 10);
			this.adjustCalendars();
		}
	},

	/**
  * change the minDate
  */
	setMinDate: function setMinDate(value) {
		if (value instanceof Date) {
			setToStartOfDay(value);
			this._o.minDate = value;
			this._o.minYear = value.getFullYear();
			this._o.minMonth = value.getMonth();
		} else {
			this._o.minDate = defaults$1.minDate;
			this._o.minYear = defaults$1.minYear;
			this._o.minMonth = defaults$1.minMonth;
			this._o.startRange = defaults$1.startRange;
		}

		this.draw();
	},

	/**
  * change the maxDate
  */
	setMaxDate: function setMaxDate(value) {
		if (value instanceof Date) {
			setToStartOfDay(value);
			this._o.maxDate = value;
			this._o.maxYear = value.getFullYear();
			this._o.maxMonth = value.getMonth();
		} else {
			this._o.maxDate = defaults$1.maxDate;
			this._o.maxYear = defaults$1.maxYear;
			this._o.maxMonth = defaults$1.maxMonth;
			this._o.endRange = defaults$1.endRange;
		}

		this.draw();
	},

	setStartRange: function setStartRange(value) {
		this._o.startRange = value;
	},

	setEndRange: function setEndRange(value) {
		this._o.endRange = value;
	},

	/**
  * refresh the HTML
  */
	draw: function draw(force) {
		if (!this._v && !force) {
			return;
		}
		var opts = this._o,
		    minYear = opts.minYear,
		    maxYear = opts.maxYear,
		    minMonth = opts.minMonth,
		    maxMonth = opts.maxMonth,
		    html = '',
		    randId;

		if (this._y <= minYear) {
			this._y = minYear;
			if (!isNaN(minMonth) && this._m < minMonth) {
				this._m = minMonth;
			}
		}
		if (this._y >= maxYear) {
			this._y = maxYear;
			if (!isNaN(maxMonth) && this._m > maxMonth) {
				this._m = maxMonth;
			}
		}

		randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

		for (var c = 0; c < opts.numberOfMonths; c++) {
			html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId) + '</div>';
		}

		this.el.innerHTML = html;

		if (opts.bound) {
			if (opts.field.type !== 'hidden') {
				sto(function () {
					opts.trigger.focus();
				}, 1);
			}
		}

		if (typeof this._o.onDraw === 'function') {
			this._o.onDraw(this);
		}
		// let the screen reader user know to use arrow keys
		this._o.field.setAttribute('aria-label', 'Use the arrow keys to pick a date');
	},

	adjustPosition: function adjustPosition() {
		var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect;

		if (this._o.container) return;

		this.el.style.position = 'absolute';

		field = this._o.trigger;
		pEl = field;
		width = this.el.offsetWidth;
		height = this.el.offsetHeight;
		viewportWidth = window.innerWidth || document$1.documentElement.clientWidth;
		viewportHeight = window.innerHeight || document$1.documentElement.clientHeight;
		scrollTop = window.pageYOffset || document$1.body.scrollTop || document$1.documentElement.scrollTop;

		if (typeof field.getBoundingClientRect === 'function') {
			clientRect = field.getBoundingClientRect();
			left = clientRect.left + window.pageXOffset;
			top = clientRect.bottom + window.pageYOffset;
		} else {
			left = pEl.offsetLeft;
			top = pEl.offsetTop + pEl.offsetHeight;
			while (pEl = pEl.offsetParent) {
				left += pEl.offsetLeft;
				top += pEl.offsetTop;
			}
		}

		// default position is bottom & left
		if (this._o.reposition && left + width > viewportWidth || this._o.position.indexOf('right') > -1 && left - width + field.offsetWidth > 0) {
			left = left - width + field.offsetWidth;
		}
		if (this._o.reposition && top + height > viewportHeight + scrollTop || this._o.position.indexOf('top') > -1 && top - height - field.offsetHeight > 0) {
			top = top - height - field.offsetHeight;
		}

		this.el.style.left = left + 'px';
		this.el.style.top = top + 'px';
	},

	/**
  * render HTML for a particular month
  */
	render: function render(year, month, randId) {
		var opts = this._o,
		    now = new Date(),
		    days = getDaysInMonth(year, month),
		    before = new Date(year, month, 1).getDay(),
		    data = [],
		    row = [];
		setToStartOfDay(now);
		if (opts.firstDay > 0) {
			before -= opts.firstDay;
			if (before < 0) {
				before += 7;
			}
		}
		var previousMonth = month === 0 ? 11 : month - 1,
		    nextMonth = month === 11 ? 0 : month + 1,
		    yearOfPreviousMonth = month === 0 ? year - 1 : year,
		    yearOfNextMonth = month === 11 ? year + 1 : year,
		    daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);
		var cells = days + before,
		    after = cells;
		while (after > 7) {
			after -= 7;
		}
		cells += 7 - after;
		for (var i = 0, r = 0; i < cells; i++) {
			var day = new Date(year, month, 1 + (i - before)),
			    isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
			    isToday = compareDates(day, now),
			    isEmpty = i < before || i >= days + before,
			    dayNumber = 1 + (i - before),
			    monthNumber = month,
			    yearNumber = year,
			    isStartRange = opts.startRange && compareDates(opts.startRange, day),
			    isEndRange = opts.endRange && compareDates(opts.endRange, day),
			    isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
			    isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && isWeekend(day) || opts.disableDayFn && opts.disableDayFn(day);

			if (isEmpty) {
				if (i < before) {
					dayNumber = daysInPreviousMonth + dayNumber;
					monthNumber = previousMonth;
					yearNumber = yearOfPreviousMonth;
				} else {
					dayNumber = dayNumber - days;
					monthNumber = nextMonth;
					yearNumber = yearOfNextMonth;
				}
			}

			var dayConfig = {
				day: dayNumber,
				month: monthNumber,
				year: yearNumber,
				isSelected: isSelected,
				isToday: isToday,
				isDisabled: isDisabled,
				isEmpty: isEmpty,
				isStartRange: isStartRange,
				isEndRange: isEndRange,
				isInRange: isInRange,
				showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths
			};

			row.push(renderDay(dayConfig));

			if (++r === 7) {
				if (opts.showWeekNumber) {
					row.unshift(renderWeek(i - before, month, year));
				}
				data.push(renderRow(row, opts.isRTL));
				row = [];
				r = 0;
			}
		}
		return renderTable(opts, data, randId);
	},

	isVisible: function isVisible() {
		return this._v;
	},

	show: function show() {
		if (!this.isVisible()) {
			removeClass(this.el, 'is-hidden');
			this._v = true;
			this.draw();
			if (this._o.bound) {
				addEvent(document$1, 'click', this._onClick);
				this.adjustPosition();
			}
			if (typeof this._o.onOpen === 'function') {
				this._o.onOpen.call(this);
			}
		}
	},

	hide: function hide() {
		var v = this._v;
		if (v !== false) {
			if (this._o.bound) {
				removeEvent(document$1, 'click', this._onClick);
			}
			this.el.style.position = 'static'; // reset
			this.el.style.left = 'auto';
			this.el.style.top = 'auto';
			addClass(this.el, 'is-hidden');
			this._v = false;
			if (v !== undefined && typeof this._o.onClose === 'function') {
				this._o.onClose.call(this);
			}
		}
	},

	/**
  * GAME OVER
  */
	destroy: function destroy() {
		this.hide();
		removeEvent(this.el, 'mousedown', this._onMouseDown, true);
		removeEvent(this.el, 'touchend', this._onMouseDown, true);
		removeEvent(this.el, 'change', this._onChange);
		if (this._o.field) {
			removeEvent(this._o.field, 'change', this._onInputChange);
			if (this._o.bound) {
				removeEvent(this._o.trigger, 'click', this._onInputClick);
				removeEvent(this._o.trigger, 'focus', this._onInputFocus);
				removeEvent(this._o.trigger, 'blur', this._onInputBlur);
			}
		}
		if (this.el.parentNode) {
			this.el.parentNode.removeChild(this.el);
		}
	}

};

function AppFactory(serverUrl) {
	var App = { init: init };
	var stationsData = void 0;
	var stationsArray = void 0;

	var fromInputSelector = 'input[name="from"]';
	var toInputSelector = 'input[name="to"]';
	var dateInputSelector = '#datepicker';
	var searchBtnSelector = 'input[value="Buscar autobuses"]';

	function init() {
		stationsData = {};
		stationsArray = [];

		var dateSelector = document.getElementById('datepicker');
		new Pikaday({ field: dateSelector });
		dateSelector.value = Pikaday.prototype.dateToString(new Date());

		document.querySelector(searchBtnSelector).addEventListener('click', _onBtnSearchClick);
		fetch('/stations.json').then(_populateSelects);
	}

	function _populateSelects(stations) {
		stations.forEach(function (element) {
			stationsArray.push(element.name);
			stationsData[element.name] = element.id;
		});

		_newAutocomplete(fromInputSelector);
		_newAutocomplete(toInputSelector);
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
		var from = stationsData[document.querySelector(fromInputSelector).value];
		var to = stationsData[document.querySelector(toInputSelector).value];
		var date = document.querySelector(dateInputSelector).value;

		if (!from || !to || !date) {
			return;
		}

		_deleteOldTable();
		_changeVisibleElements('none', 'block', 'none');

		fetch('' + serverUrl + from + '/' + to + '/' + date).then(_onResponse).catch(_onError);
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
		var table = document.querySelector('.timetable');
		if (table) {
			document.querySelector('section').removeChild(table);
		}
	}

	function _changeVisibleElements(button, spinner, error) {
		document.querySelector(searchBtnSelector).style.display = button;
		document.querySelector('.spinner').style.display = spinner;
		document.querySelector('.error-msg').style.display = error;
	}

	return App;
}

// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('service-worker.js');
// }

var app = AppFactory('https://monbus.herokuapp.com/');
app.init();

}());
