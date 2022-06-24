const Comment = require('../models/comment');
const Card = require('../models/card');
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const { cardId, comment } = req.body;
      const card = await Card.findById(cardId);

      if (!card) {
        return next(new HttpError("Invalid Card Id", 404));
      }

      comment.cardId = cardId;
      const newComment = await Comment.create(comment);

      card.comments = card.comments.concat(newComment._id);
      card.commentsCount = card.comments.length;
      await card.save();

      res.json({
        _id: newComment._id,
        text: newComment.text,
        cardId: newComment.cardId,
        createdA: newComment.createdAt,
        updatedAt: newComment.updatedAt
      });
    } catch (e) {
      console.log(e);
      next(new HttpError("Creating comment failed, please try again", 500))
    }
  } else  {
    return next(new HttpError("Unprocessable Entity", 422));
  }
}

exports.createComment = createComment;