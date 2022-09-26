const Card = require('../models/card');
const List = require('../models/list');
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createCard = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const { listId, card } = req.body;
      const list = await List.findById(listId);

      if (!list) {
        return next(new HttpError("Invalid List Id", 404));
      }

      card.listId = listId;
      card.boardId = list.boardId;
      const newCard = await Card.create(card);

      list.cards = list.cards.concat(newCard._id);

      await list.save();

      res.json({
        _id: newCard._id,
        title: newCard.title,
        description: newCard.description,
        listId: newCard.listId,
        createdAt: newCard.createdAt,
        updatedAt: newCard.updatedAt
      });
      
    } catch (e) {
      console.log("error:", e)
      next(new HttpError("Creating card failed, please try again", 500))
    }
  } else {
    return next(new HttpError("Unprocessable Entity", 422));
  }
};

const getCard = async (req, res, next) => {
  try {
    const id = req.params.id;
    const card = await Card.findById(id).populate('comments');
    console.log(card);
    res.json(card);
  } catch (e) {
    return next(new HttpError("Invalid or missing ID.", 404))
  }
};

// Still need to implement actions for cards

const updateCard = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    try {
      const { id } = req.params;
      const cardUpdates = req.body.card;
      cardUpdates.updatedAt = new Date().toISOString();
      const cardWithUpdates = await Card.findByIdAndUpdate(id, cardUpdates, { new: true });
  
      if (cardWithUpdates === null) {
        return next(new HttpError("Invalid or non-existent card id", 404));
      }
  
      res.json(cardWithUpdates);
    } catch (e) {
      console.log("Internal Server Error:", e);
      next(new HttpError("Updating card failed, please try again", 500));
    }
  } else {
    next(new HttpError("Unprocessable entity", 422));
  }
};

exports.createCard = createCard;
exports.getCard = getCard;
exports.updateCard = updateCard;