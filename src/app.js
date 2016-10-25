import AppFactory from './appFactory.js';

// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('service-worker.js');
// }

let app = AppFactory('https://monbus.herokuapp.com/');
app.init();
