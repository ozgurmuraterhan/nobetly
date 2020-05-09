const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommanderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    task: { type: String, required: true, trim: true },
    rank: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const Commander = mongoose.model('commander', CommanderSchema);

module.exports = Commander;
