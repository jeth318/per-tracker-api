 var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var pefSchema = new Schema({
    date: Date,
    pefValue: Number,
    tags: [],
    comment: String
  });

module.exports = mongoose.model('Pef', pefSchema);