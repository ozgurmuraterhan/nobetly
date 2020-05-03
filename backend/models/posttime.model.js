const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostTimeSchema = new Schema(
  {
    date: {
      type: Date,

      required: true,
      unique: true,
    },
    posts: {
      type: Array,
    },
    postsview: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Posttime = mongoose.model('posttime', PostTimeSchema);

module.exports = Posttime;
