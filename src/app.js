import AppFactory from './appFactory.js';
import stations from './stations.js';

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('service-worker.js');
}

let app = AppFactory('https://monbus.herokuapp.com/', stations);
app.init();
