const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug'); //ovom i linijom ispod govorimo da hocemo da kompajliramo pug engine i gde mozemo nadci ove templejte
app.set('views', 'views'); //ova druga vrednost je ime foldera u kom se nalaze views, u ovom slucaju je ista

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(3000);