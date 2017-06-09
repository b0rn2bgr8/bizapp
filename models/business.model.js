var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var businessSchema = new Schema({
    name: String,
    streetAddress: String,
    surburb: String,
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

businessSchema.methods.findNear = function(cb) {
  return this.model('Business').find({location: { $nearSphere: this.location, $maxDistance: 0.01} }, cb);
}

module.exports = mongoose.model('Business', businessSchema);