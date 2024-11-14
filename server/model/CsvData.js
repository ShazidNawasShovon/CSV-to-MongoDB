const mongoose = require('mongoose');

// Define the schema with default timestamps and allow dynamic fields
const csvSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current timestamp
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set to the current timestamp, updated on save
  },
  deletedAt: {
    type: Date,
    default: null, // Initially null, used for soft deletion
}}, { strict: false }); // `strict: false` allows any field to be added dynamically

// Middleware to update `updatedAt` field on each save
csvSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// const CsvData = mongoose.models.CsvData ?? mongoose.model('CsvData', csvSchema);
const CsvData = mongoose.models.CareerPath ?? mongoose.model('CareerPath', csvSchema);

module.exports = CsvData;
