const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();

// the name here is reflected in the file names in the view
// I changed the engine to html allowing me to just use the html files for the work
app.engine('html', expressHbs({layoutsDir:'views/layouts/', defaultLayout:'main', extname:'html'}));// initialize the engine
app.set('view engine', 'html');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

app.listen(3000);

 
 
// const path = require('path');// core module
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();// valid requst handler

// // these are global settings the templating engines all work with express - default setting is views
// app.set('view engine', 'pug');
// app.set('views', 'views'); // not really necessary as views is the default

// const adminData = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

// app.use(bodyParser.urlencoded({extended: false}));// parse this!! npm install --save body-parser
// app.use(express.static(path.join(__dirname, 'public')));

// /// these just replace having these files in the server 
// app.use('/admin', adminData.routes);
// app.use(shopRoutes);
// // app.use('/',(req, res, next) => {
// //     res.send("<h1>HELLO WORLD!!!!</h1>");// do not need all the other stuff here, the stuff that we did in the basic http server
// // });

// // catch all
// app.use((req, res, next) =>{
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));// path join is a little magic -works with window and linux
// });

// app.listen(3000);

// // do not need these cause listen will take it
// // const server = http.createServer(app);
// // server.listen(3000);

