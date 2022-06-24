const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: [true, 'The Card title is required']
  },
  cardId: {
    type: Schema.Types.ObjectId,
    ref: "Card"
  },
  createdAt: {
    type: String,
    default: () => new Date().toISOString()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },
})

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);