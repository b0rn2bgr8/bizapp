var router = require('express').Router();

var Business = require('../models/business.model');


router.get('/', function(req, res, next){
    Business.find(function(err, b){
        if(err){return next(err);}

        res.json(b);
    });

});

// router.get('/:id', function(req, res, next){
//     Business.findById({_id: req.params.id}, function(err, b){
//         if(err){return next(err);}
//         res.json(b);
//     });
// });

router.post('/', function(req, res, next){
    var biz = new Business({
        name: req.body.name,
        streetAddress: req.body.address,
        surburb: req.body.surburb,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        tel: req.body.tel,
        email: req.body.email,
        location: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
    });
        biz.save(function(err){
            if(err){return next(err);}
            res.json({"message": "New Business added successfully"});
        });
});

router.get('/geowithin', function(req, res, next){

    Business.find({location: {$nearSphere: [parseFloat(req.query.latitude), parseFloat(req.query.longitude)],$maxDistance: 0.001}})
    .exec(function(err, b){
        if(err){return next(err);}
        res.json(b);
    });
    //res.json({latitude: parseFloat(req.query.latitude), longitude: parseFloat(req.query.longitude)});
});

module.exports = router;