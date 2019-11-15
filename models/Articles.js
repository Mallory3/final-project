//require dependency
const mongoose = require('mongoose');

//made mongoose schema for articles
const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    summary: {
      type: String,
      require: true
    },
    body: {
      type: String,
      require: true
    },
    slug: {
      type: String,
      required: true
    }
  }
);

//'articles' is the name of the MongoDB collection within the final database
const Articles = mongoose.model('articles', articleSchema);

//Export module to export articleSchema model
module.exports = Articles;
console.log("module exported")