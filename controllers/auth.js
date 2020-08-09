const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.get('Cookie'));
  console.log('-- SESSION -- \n', req.session);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  //res.setHeader('Set-Cookie', 'Some cookie');
  console.log('-- SESSION -- \n', req.session);
  User.findById('5f26d93e55455637901a5db4')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
