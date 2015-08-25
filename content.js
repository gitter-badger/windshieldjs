var content = require('cars-content');
console.log('all:', content());
console.log('topic:', content('news'));
console.log('one:', content('news', 'index'));
