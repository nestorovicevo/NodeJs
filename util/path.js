const path = require('path');

module.exports = path.dirname(process.mainModule.filename); //globalno je dostupna u svim fajlovima process varijabla, ne moramo je importovati