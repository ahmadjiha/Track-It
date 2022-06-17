const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Board title is required']
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: "List"
    }
  ]
})

// const Board = mongoose.model('Board', BoardSchema);

module.exports = mongoose.models.Board || mongoose.model('Board', BoardSchema);