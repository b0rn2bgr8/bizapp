var router = require('express').Router();

var Business = require('../models/business.model');


router.get('/', function(req, res, next){
    Business.find(function(err, b){
        if(err){return next(err);}

        res.json(b);
    });

});

router.get('/q/:id', function(req, res, next){
    Business.findById({_id: req.params.id}, function(err, b){
        if(err){return next(err);}
        res.json(b);
    });
});

router.post('/', function(req, res, next){
    var biz = new Business({
        name: req.body.name,
        streetAddress: req.body.address,
        surburb: req.body.surburb,
        city: req.body.city,
        website: req.body.website,
        logo: req.body.logo,
        province: req.body.province,
        postalCode: req.body.postalCode,
        tel: req.body.tel,
        email: req.body.email,
        tags: req.body.tags,
        location: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
    });
        biz.save(function(err){
            if(err){return next(err);}
            res.json({"message": "New Business added successfully"});
        });
});

//Businesses within 5km radius
router.get('/geowithin', function(req, res, next){

    Business.find({location: {
        $nearSphere: {
            $geometry:{
                type: 'Point',
                coordinates: [parseFloat(req.query.latitude), parseFloat(req.query.longitude)]
            },
            $maxDistance: parseInt(req.query.distance) || 5000
        }
    }})
    .exec(function(err, b){
        if(err){return next(err);}
        res.json(b);
    });
});

router.get('/searchall', function(req, res, next){
    Business.find().or(
        [
            {tags:  {$in: [req.query.searchStr]}}, 
            {name:  {$regex : ".*" + req.query.searchStr +".*"}}
            ])   
    .exec(function(err, b){
        if(err){return next(err);}
        res.json(b);
    });
});

router.get('/search', function(req, res, next){
    Business.find({tags:  {$in: [req.query.searchStr]}}   
    ).exec(function(err, b){
        if(err){return next(err);}
        res.json(b);
    });
});

module.exports = router;