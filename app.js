const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const db = require('./util/database');

const app = express();

app.set('view engine', 'ejs'); //ovom i linijom ispod govorimo da hocemo da kompajliramo pug engine i gde mozemo nadci ove templejte
                                        //naknadno smo promenili pug u handlebars zato sto radimo sad sa drugim, i taj je za express
                                        // i tu moze da stoji i npr handlebars, ali mora onda i gore i dole da pise handlebars, mora pisati identicno
                                            //ali je bitno da onako kako nazovemo, to ce biti sufiks za ime fajla u views
app.set('views', 'views'); //ova druga vrednost je ime foldera u kom se nalaze views, u ovom slucaju je ista

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

db.execute('SELECT * FROM products');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);