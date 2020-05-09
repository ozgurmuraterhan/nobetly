const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoncomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Noncom = mongoose.model('noncom', NoncomSchema);

module.exports = Noncom;
