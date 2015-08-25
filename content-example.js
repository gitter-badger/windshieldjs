var content = require('cars-content');
console.log('all:', content());
console.log('topic:', content('news'));
console.log('topic:', content('bad'));
console.log('one:', content('news', 'index'));
console.log('another:', content('news', 'foo'));
console.log('bad:', content('news', 'bad'));
console.log('navigation:', content('navigation', 'header'));
