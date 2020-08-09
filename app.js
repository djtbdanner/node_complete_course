const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
let x = new User("Dave", "mail@server.com", {}, new ObjectId('123456789102') )

app.use((req, res, next) => {
  User.findById('313233343536373839313032')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      console.log("Set user", req.user);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
