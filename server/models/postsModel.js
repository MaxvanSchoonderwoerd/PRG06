const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user: String,
    title: String,
    body: String,
    active: String,
  },
  { toJSON: { virtuals: true } }
);

PostSchema.virtual("_links").get(function () {
  return {
    self: {
      href: `${process.env.BASE_URI}/${this._id}`,
    },
    collection: {
      href: `${process.env.BASE_URI}`,
    },
  };
});

module.exports = mongoose.model("Post", PostSchema);
