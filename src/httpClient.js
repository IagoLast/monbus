function fetch(url) {
	return new Promise(function(resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open('get', url, true);
		xhr.onreadystatechange = function() {
			let status;
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

export default fetch;
