const path = require('path');// core module

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/',(req, res, next) => {
    //res.send("<h1>HELLO WORLD!!!!</h1>");// do not need all the other stuff here, the stuff that we did in the basic http server
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));// path join is a little magic -works with window and linux
});

module.exports = router;