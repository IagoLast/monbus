import buildTable from './tableBuilder.js';
import autoComplete from './autocomplete.js';

function AppFactory(serverUrl) {
	let App = { init };
	let stationsData;
	let stationsArray;

	function init() {
		stationsData = {};
		stationsArray = [];
		document.querySelector('input[name="date"').valueAsDate = new Date();
		document.querySelector('input[type="button"').addEventListener('click', _onBtnSearchClick);

		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('sw.js');
		}

		fetch('stations.json', { method: 'get' })
			.then((response) => response.json())
			.then(_populateSelects);
	}

	function _populateSelects(stations) {
		stations.forEach((element) => {
			stationsArray.push(element.name);
			stationsData[element.name] = element.id;
		});

		_newAutocomplete('input[name="from"]');
		_newAutocomplete('input[name="to"]');
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
		let from = stationsData[document.querySelector('input[name="from"').value];
		let to = stationsData[document.querySelector('input[name="to"').value];
		let date = document.querySelector('input[name="date"').value;

		if (!from || !to || !date) {
			return;
		}

		_deleteOldTable();
		_changeVisibleElements('none', 'block', 'none');

		fetch(`${serverUrl}${from}/${to}/${date}`, { method: 'get' })
			.then((response) => response.json())
			.then(_onResponse)
			.catch(_onError);
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
		let table = document.querySelector('table');
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

export default AppFactory;
