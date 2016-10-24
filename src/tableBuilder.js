function buildTable(headers, data) {
	let table = document.createElement('table');
	let head = document.createElement('thead');
	let body = document.createElement('tbody');

	for (let i = 0; i < headers.length; i++) {
		let header = _createHeader(headers[i]);
		head.appendChild(header);
	}

	for (let i = 0; i < data.length; i++) {
		body.appendChild(_createRow(data[i]));
	}

	table.appendChild(head);
	table.appendChild(body);

	return table;
}

function _createHeader(text) {
	let header = document.createElement('th');
	header.innerHTML = text;
	return header;
}

function _createRow(data) {
	let row = document.createElement('tr');
	for (let key in data) {
		if (data.hasOwnProperty(key)) {
			let content = data[key];
			let cell = document.createElement('td');
			cell.innerHTML = content;
			row.appendChild(cell);
		}
	}
	return row;
}


export default buildTable;
