const Card = require('../models/card');
const List = require('../models/list');
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createCard = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const list = await List.findById(req.body.listId);

      if (!list) {
        return next(new HttpError("Invalid List Id", 404));
      }

      const card = await Card.create(req.body.card);
      list.cards = list.cards.concat(card._id);
      await list.save();

      res.json({
        _id: card._id,
        title: card.title,
        description: card.description,
        listId: card.listId,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt
      });
      
    } catch (e) {
      next(new HttpError("Creating card failed, please try again", 500))
    }
  } else {
    return next(new HttpError("Unprocessable Entity", 422));
  }
}

const getCard = async (req, res, next) => {
  try {
    const id = req.params.id;
    const card = await Card.find({ _id: id});
    res.json(card);
  } catch (e) {
    return next(new HttpError("Invalid or missing ID.", 404))
  }
}

exports.createCard = createCard;
exports.getCard = getCard;