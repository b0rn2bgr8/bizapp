var router = require('express').Router();

router.get('/', function(req, res, next){
    res.render('global/home');
});


module.exports = router;