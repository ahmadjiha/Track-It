const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ObjectId } = Schema.Types;

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The List title is required']
  },
  boardId: {
    type: ObjectId,
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