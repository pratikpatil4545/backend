const mongoose = require('mongoose');

const failedSearchSchema = new mongoose.Schema({
  query: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  count: { type: Number, default: 1 }
});

module.exports = mongoose.model('FailedSearch', failedSearchSchema);
