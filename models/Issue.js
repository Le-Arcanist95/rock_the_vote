const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  upvotes: {
    type: [String],
    default: []
  },
  downvotes: {
    type: [String],
    default: []
  },
  resolved: {
    type: Boolean,
    default: false
  },
  comments: {
    type: Array,
    prefixItems: {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    },
    default: []
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

module.exports = mongoose.model("Issue", issueSchema)