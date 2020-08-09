const path = require('path');// core module
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));// path join is a little magic -works with window and linux
});

// can use app get too - use will be for both get and post
router.post('/add-product', (req, res) => {
    console.log("the body", req.body);
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));// path join is a little magic -works with window and linux
    res.redirect("/");
});

module.exports = router;