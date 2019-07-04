const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');


const app = express();

app.set('view engine', 'ejs'); //ovom i linijom ispod govorimo da hocemo da kompajliramo pug engine i gde mozemo nadci ove templejte
                                        //naknadno smo promenili pug u handlebars zato sto radimo sad sa drugim, i taj je za express
                                        // i tu moze da stoji i npr handlebars, ali mora onda i gore i dole da pise handlebars, mora pisati identicno
                                            //ali je bitno da onako kako nazovemo, to ce biti sufiks za ime fajla u views
app.set('views', 'views'); //ova druga vrednost je ime foldera u kom se nalaze views, u ovom slucaju je ista

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=> {
    User.findByPk(1)
    .then( user=> {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);


sequelize
// .sync({ force: true })  // ovo automatski pravi od modela tabele u bazi!! ,, dok force: true adds a DROP TABLE IF EXISTS before trying to create the table - if you force, existing tables will be overwritten.
.sync()
.then(result => {
    return User.findByPk(1);
    // console.log(result);
})
.then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });