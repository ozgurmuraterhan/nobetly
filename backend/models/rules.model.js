const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RulesSchema = new Schema(
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

const Rules = mongoose.model('rules', RulesSchema);

module.exports = Rules;
