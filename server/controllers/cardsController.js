const Card = require('../models/card');
const List = require('../models/list');
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createCard = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const card = await Card.create(req.body.card);
      const list = await List.findById(card.listId);
      list.cards = list.cards.concat(card._id);
      await list.save();

      res.json({
        title: card.title,
        description: card.description,
        listId: card.listId
      });
      
    } catch (e) {
      next(new HttpError("Creating card failed, please try again", 500))
    }
  } else {
    return next(new HttpError("The input field is empty.", 404));
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