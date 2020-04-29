const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SoldierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
    },
    gun_number: {
      type: String,
      trim: true,
    },
    ssn: {
      type: String,
    },
    phone: {
      type: String,
    },
    due_note: {
      type: String,
    },
    risk: {
      type: Number,
    },
    group_id: {
      type: Array,
      trim: true,
    },
    defaultAddress_country_id: {
      type: String,
    },
    defaultAddress_state_id: {
      type: String,
    },
    defaultAddress_town: {
      type: String,
    },
    defaultAddress_zipcode: {
      type: Number,
    },
    totalPost: {
      type: Number,
    },

    defaultAddress_address: {
      type: String,
    },
    over_date: {
      type: Date,
      required: true,
    },
    spesific_id: {
      type: String,
    },
    holiday: {
      type: Array,
    },
    times: {
      type: Object,
      required: true,
    },
    posts: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Soldier = mongoose.model('Soldier', SoldierSchema);

module.exports = Soldier;
