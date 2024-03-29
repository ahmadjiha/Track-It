const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required']
  },
  description: {
    type: String,
    default: ""
  },
  labels: {
    type: Array,
    default: []
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'List'
  },
  archived: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: () => new Date().toISOString()
  },
  updatedAt: {
    type: Date,
    default: () => new Date().toISOString()
  },
  dueDate: {
    type: Date,
    default: null
  },
  completed: {
    type: Boolean,
    default: false
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  commentsCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.models.Card || mongoose.model('Card', CardSchema);