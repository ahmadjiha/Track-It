const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ObjectId } = Schema.Types;

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The List title is required']
  },
  createdAt: {
    type: Date,
    default: () => new Date().toISOString()
  },
  updatedAt: {
    type: Date,
    default: () => new Date().toISOString()
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: "Board"
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card"
    }
  ]
});

module.exports = mongoose.models.List || mongoose.model('List', ListSchema);