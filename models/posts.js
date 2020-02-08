const mongoose = require('mongoose');
require('mongoose-type-url');

const PostsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    work: mongoose.SchemaTypes.Url,
    profile: mongoose.SchemaTypes.Url
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  filtertype: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Posts = mongoose.model('Posts', PostsSchema);

module.exports = Posts;