var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function(req, res, next) {
    res.send('aaa');
});

router.post('/',function(req, res){
    console.log(req);
    res.send();
});

module.exports = router;
