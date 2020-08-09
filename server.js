const path = require('path');// core module
const express = require('express');
const bodyParser = require('body-parser');

const app = express();// valid requst handler
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));// parse this!! npm install --save body-parser
app.use(express.static(path.join(__dirname, 'public')));

/// these just replace having these files in the server 
app.use('/admin', adminRoutes);
app.use(shopRoutes);
// app.use('/',(req, res, next) => {
//     res.send("<h1>HELLO WORLD!!!!</h1>");// do not need all the other stuff here, the stuff that we did in the basic http server
// });

// catch all
app.use((req, res, next) =>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));// path join is a little magic -works with window and linux
});

app.listen(3000);

// do not need these cause listen will take it
// const server = http.createServer(app);
// server.listen(3000);

