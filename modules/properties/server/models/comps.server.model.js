'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Property Schema
 */
var CompsSchema = new Schema({
  address: {
    type: String,
    default: 'address',
    required: 'Please fill address',
    trim: true
  },
  county: {
    type: String,
    default: 'county',
    required: 'Please fill county',
    trim: true
  },
  city: {
    type: String,
    default: 'city',
    required: 'Please fill city ',
    trim: true
  },
   LastUpdated: {
    type: Date,
    default: null,
    required: false
  },
   Data: {
    type: String,
    required: 'Please fill Data '
  }
});


mongoose.model('Comps', CompsSchema);

