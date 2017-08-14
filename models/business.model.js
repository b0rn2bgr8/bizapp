var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var businessSchema = new Schema({
    name: String,
    streetAddress: String,
    surburb: String,
    logo: String,
    website: String,
    city: String,
    province: String,
    postalCode: String,
    tags: [String],
    tel: String,
    created: {type: Date, default: Date.now },
    email: String,
    location: [Number]
});

businessSchema.index({location: '2dsphere'});
businessSchema.index({name: 'text'});


module.exports = mongoose.model('Business', businessSchema);