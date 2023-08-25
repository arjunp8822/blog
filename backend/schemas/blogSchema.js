const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  img: String,
  content: String,
});

const blogModel = mongoose.model("Blogs", blogSchema);

module.exports = blogModel;
