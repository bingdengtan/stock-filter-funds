var express = require('express');
var router = express.Router();

/* GET users listing. */


router.get('/hello', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
router.get('/hi', function(req, res) {
    res.json({ message: 'hi! welcome to our api!' });   
});
module.exports = router;