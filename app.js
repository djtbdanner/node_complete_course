const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');



//const db = require('./util/database');
// db.execute('SELECT * FROM products').then(
//     result=>{
//         console.log(result[0].description);
//         console.log('--------------------------------- Hi Dave -------------------------------');
//         console.log(result[1]);
//     }
// ).catch(
//     err =>{console.log(err);}
// );


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


/// get the user and store in the request ... this is fine 'cause it'll run after the initialze code
app.use((req, res, next) => {
    User.findByPk(1).then(
        user=>{
            req.user = user;
            next();// keep going
        }
    ).catch(err => { console.log(err); });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraings: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

// create tables if no exist
sequelize
    //.sync({force:true})
    .sync()
    .then(result => {
        return User.findByPk(1);/// the next then
    }).then(
        user => {
            if (!user) {
                return User.create({ name: "Dave Danner", email: "TestMail@server.com" })
            }
            return Promise.resolve(user);// promise that immediately resolves to user
        }
    ).then(
        user => {
            //console.log("found or created: " + user.name);
            //app.listen(3000);
            return user.createCart();
        }
    ).then (
        cart =>{
            console.log("All initialized", cart);
            app.listen(3000);
        }
    ) 
    .catch(err => { console.log(err); });






