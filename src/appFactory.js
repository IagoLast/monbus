import buildTable from './tableBuilder.js';
import autoComplete from './autocomplete.js';
import fetch from './httpClient.js';
import Pikaday from './datepicker.js';


function AppFactory(serverUrl) {
	let App = { init };
	let stationsData;
	let stationsArray;

	const fromInputSelector = 'input[name="from"]';
	const toInputSelector = 'input[name="to"]';
	const dateInputSelector = '#datepicker';
	const searchBtnSelector = 'input[value="Buscar autobuses"]';


	function init() {
		stationsData = {};
		stationsArray = [];

		let dateSelector = document.getElementById('datepicker');
		new Pikaday({ field: dateSelector });
		dateSelector.value = Pikaday.prototype.dateToString(new Date());

		document.querySelector(searchBtnSelector).addEventListener('click', _onBtnSearchClick);
		fetch('/stations.json').then(_populateSelects);
	}

	function _populateSelects(stations) {
		stations.forEach((element) => {
			stationsArray.push(element.name);
			stationsData[element.name] = element.id;
		});

		_newAutocomplete(fromInputSelector);
		_newAutocomplete(toInputSelector);
	}

	function _newAutocomplete(selector) {
		return new autoComplete({
			selector,
			minChars: 1,
			source: (term, suggest) => {
				term = term.toLowerCase();
				let suggestions = [];
				for (let i = 0; i < stationsArray.length; i++) {
					if (stationsArray[i].toLowerCase().includes(term)) {
						suggestions.push(stationsArray[i]);
					}
				}
				suggest(suggestions);
			},
		});
	}

	function _onBtnSearchClick() {
		let from = stationsData[document.querySelector(fromInputSelector).value];
		let to = stationsData[document.querySelector(toInputSelector).value];
		let date = document.querySelector(dateInputSelector).value;

		if (!from || !to || !date) {
			return;
		}

		_deleteOldTable();
		_changeVisibleElements('none', 'block', 'none');

		fetch(`${serverUrl}${from}/${to}/${date}`).then(_onResponse).catch(_onError);
	}

	function _onResponse(response) {
		let table;
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
		let table = document.querySelector('.timetable');
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

export default AppFactory;
