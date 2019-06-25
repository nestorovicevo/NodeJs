const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product',
    {pageTitle: 'Add product',
    path: '/admin/add-product',
    formsCSS: true, productCSS: true,
    activeAddProduct: true
   }); //render metod omogucava nam da si ovaj drugi parametar rendira u nasem view
  };

exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
  }

  exports.getProducts = (req, res, next) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.lenght > 0,
    activeShop: true,
  productCSS: true}); //render metod omogucava nam da si ovaj drugi parametar rendira u nasem view
  }